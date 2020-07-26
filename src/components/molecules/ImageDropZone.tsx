import useComponentSize from '@rehooks/component-size';
import { Upload } from '@styled-icons/boxicons-regular';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import * as vars from '~/vars';

const MAX_DISPLAY_ASPECT_RATIO = 8 / 10; // width / height

interface Props {
  onDrop: <T extends File>(acceptedFiles: T[]) => void;
  acceptedFileTypes: string[];
  previewImageURL: string | null;
  disabled?: boolean;
}

const calculateMaxHeight = (width: number) => width / MAX_DISPLAY_ASPECT_RATIO;

const ImageDropZone = (props: Props) => {
  const imageContainerRef = React.useRef(null);
  const [maxHeight, setMaxHeight] = React.useState<number>();
  const size = useComponentSize(imageContainerRef);

  const onDrop = React.useCallback(props.onDrop, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: props.disabled ?? false,
  });

  React.useEffect(() => {
    setMaxHeight(calculateMaxHeight(size.width));
  }, [imageContainerRef, size]);

  return (
    <DropZone ref={imageContainerRef} {...getRootProps()}>
      <input {...getInputProps()} accept={props.acceptedFileTypes.join(',')} />
      {props.previewImageURL === null ? (
        // no image -> display placeholder
        <DropZonePlaceholderContainer>
          <DropZonePlaceholder>
            <p>
              <UploadIcon aria-hidden={true} />
              写真をアップロード
            </p>
          </DropZonePlaceholder>
        </DropZonePlaceholderContainer>
      ) : (
        // has image -> show image preview
        <DropZonePreviewImgContainer ref={imageContainerRef}>
          <DropZonePreviewImg
            src={props.previewImageURL}
            style={{ maxHeight }}
          />
        </DropZonePreviewImgContainer>
      )}
    </DropZone>
  );
};

const DropZone = styled.div({
  position: 'relative',
  maxWidth: '100%',
});

const DropZonePlaceholderContainer = styled.div({
  position: 'relative',
  width: '100%',
  paddingTop: `${(2 / 3) * 100}%`, // aspect ratio (height / width)
});

const DropZonePlaceholder = styled.div({
  display: 'flex',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: vars.spacing.double,
  borderRadius: vars.radius.double,
  border: `4px dashed ${vars.colors.silver}`,
  color: vars.colors.gray,
  alignItems: 'center',
  justifyContent: 'center',
});

const UploadIcon = styled(Upload)({
  width: 20,
  height: 20,
  marginRight: vars.spacing.normal,
});

const DropZonePreviewImgContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

const DropZonePreviewImg = styled.img({
  objectFit: 'contain',
  maxWidth: '100%',
});

export default ImageDropZone;

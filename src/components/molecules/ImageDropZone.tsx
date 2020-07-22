import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import * as vars from '~/vars';

const acceptedFileTypes = ['image/jpeg', 'image/png'].join(',');

interface Props {
  onDrop: <T extends File>(acceptedFiles: T[]) => void;
  previewImageURL: string | null;
}

const ImageDropZone = (props: Props) => {
  const onDrop = React.useCallback(props.onDrop, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <DropZone {...getRootProps()}>
      <input {...getInputProps()} accept={acceptedFileTypes} />
      {props.previewImageURL === null ? (
        // no image -> display placeholder
        <DropZonePlaceholderContainer>
          <DropZonePlaceholder>
            <p>ファイルをアップロード</p>
          </DropZonePlaceholder>
        </DropZonePlaceholderContainer>
      ) : (
        // has image -> show image preview
        <DropZonePreviewImg src={props.previewImageURL} />
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
  margin: vars.spacing.quadruple,
  borderRadius: vars.radius.double,
  border: `4px dotted ${vars.colors.silver}`,
  color: vars.colors.gray,
  alignItems: 'center',
  justifyContent: 'center',
});

const DropZonePreviewImg = styled.img({
  maxWidth: '100%',
});

export default ImageDropZone;

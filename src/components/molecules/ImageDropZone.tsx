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
        <DropZonePlaceholder>
          <DropZonePlaceholderContent>
            <p>ファイルをアップロード</p>
          </DropZonePlaceholderContent>
        </DropZonePlaceholder>
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

const DropZonePlaceholder = styled.div({
  position: 'relative',
  width: '100%',
  paddingTop: '100%', // 1:1 aspect ratio
  backgroundColor: vars.colors.lightsilver,
});

const DropZonePlaceholderContent = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const DropZonePreviewImg = styled.img({
  maxWidth: '100%',
});

export default ImageDropZone;

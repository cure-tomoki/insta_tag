import * as React from 'react';
import { useDropzone } from 'react-dropzone';

const acceptedFileTypes = ['image/jpeg', 'image/png'].join(',');

interface Props {
  onDrop: <T extends File>(acceptedFiles: T[]) => void;
  previewImageURL: string | null;
}

const ImageDropZone = (props: Props) => {
  const onDrop = React.useCallback(props.onDrop, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} accept={acceptedFileTypes} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <p>Drag & drop an image here, or click to select files</p>
          <p>only jpeg / png are premitted</p>
        </>
      )}
      {props.previewImageURL !== undefined && (
        <img src={props.previewImageURL || undefined} />
      )}
    </div>
  );
};

export default ImageDropZone;

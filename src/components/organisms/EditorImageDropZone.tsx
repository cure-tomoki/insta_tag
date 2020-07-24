import * as React from 'react';

import ImageDropZone from '~/components/molecules/ImageDropZone';
import * as EditorDuck from '~/ducks/EditorDuck';
import useExifReader from '~/hooks/useExifReader';
import useImagePreview from '~/hooks/useImagePreview';
import useRootContext from '~/hooks/useRootContext';

const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/heic'];

const EditorImageDropZone = () => {
  const { dispatch } = useRootContext();
  const previewImageURL = useImagePreview();
  useExifReader();

  const handleImageDrop = <x extends File>(acceptedFiles: x[]) => {
    const acceptedFile = acceptedFiles[0]; // ignore rest :p
    dispatch(EditorDuck.actions.setImageFile({ file: acceptedFile }));
  };

  return (
    <ImageDropZone
      onDrop={handleImageDrop}
      acceptedFileTypes={acceptedFileTypes}
      previewImageURL={previewImageURL}
    />
  );
};

export default EditorImageDropZone;

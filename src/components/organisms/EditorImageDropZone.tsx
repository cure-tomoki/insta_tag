import * as React from 'react';

import ImageDropZone from '~/components/molecules/ImageDropZone';
import { Context } from '~/context';
import * as EditorDuck from '~/ducks/EditorDuck';
import useExifReader from '~/hooks/useExifReader';

const EditorImageDropZone = () => {
  const { state, dispatch } = React.useContext(Context);
  const { image, readExifData } = useExifReader(
    EditorDuck.selectors.getImageFile(state)
  );
  const handleImageDrop = <x extends File>(acceptedFiles: x[]) => {
    const file = acceptedFiles[0]; // ignore rest :p
    readExifData(file)
      .then((exifData) => {
        dispatch(EditorDuck.actions.setImageFile({ file }));
        dispatch(EditorDuck.actions.setExif({ exifData }));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <ImageDropZone
      onDrop={handleImageDrop}
      previewImageURL={image.previewImageURL}
    />
  );
};

export default EditorImageDropZone;

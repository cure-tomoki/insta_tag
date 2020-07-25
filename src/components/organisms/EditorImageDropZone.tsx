import * as React from 'react';

import ImageDropZone from '~/components/molecules/ImageDropZone';
import * as EditorDuck from '~/ducks/EditorDuck';
import useRootContext from '~/hooks/useRootContext';
import { createImagePreviewURL, readExifData } from '~/utils/imageUtil';

const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/heic'];

const EditorImageDropZone = () => {
  const { state, dispatch } = useRootContext();
  const { file, previewURL } = EditorDuck.selectors.getImage(state);

  React.useEffect(() => {
    if (file === null) return;
    (async () => {
      try {
        const exif = await readExifData(file);
        dispatch(EditorDuck.actions.setExif({ exifData: exif }));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [file]);

  const handleImageDrop = <x extends File>(acceptedFiles: x[]) => {
    const acceptedFile = acceptedFiles[0]; // ignore rest :p
    try {
      (async () => {
        const url = await createImagePreviewURL(acceptedFile);
        if (url === null) return;
        dispatch(
          EditorDuck.actions.setImage({ file: acceptedFile, previewURL: url })
        );
      })();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageDropZone
      onDrop={handleImageDrop}
      acceptedFileTypes={acceptedFileTypes}
      previewImageURL={previewURL}
    />
  );
};

export default EditorImageDropZone;

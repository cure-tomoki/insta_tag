import * as React from 'react';

import ImageDropZone from '~/components/molecules/ImageDropZone';
import { Context } from '~/context';
import * as EditorDuck from '~/ducks/EditorDuck';

const EditorImageDropZone = () => {
  const { state, dispatch } = React.useContext(Context);

  const imageFile = EditorDuck.selectors.getImageFile(state);
  console.log({ imageFile });

  const previewImageURL = React.useMemo(() => {
    return imageFile ? URL.createObjectURL(imageFile) : null;
  }, [imageFile]);

  const handleImageDrop = <x extends File>(acceptedFiles: x[]) => {
    const file = acceptedFiles[0]; // ignore rest :p
    dispatch(EditorDuck.actions.setImageFile({ file }));
  };
  return (
    <ImageDropZone onDrop={handleImageDrop} previewImageURL={previewImageURL} />
  );
};

export default EditorImageDropZone;

import heic2any from 'heic2any';
import * as React from 'react';

import * as EditorDuck from '~/ducks/EditorDuck';
import useRootContext from '~/hooks/useRootContext';
import { assert } from '~/utils/commonUtils';

const convertHeicToJpeg = async <x extends File>(heic: x): Promise<Blob> => {
  const jpeg = await heic2any({
    blob: heic,
    toType: 'image/jpeg',
    quality: 0.3,
  });
  assert(!Array.isArray(jpeg), 'result of heic2any should not be an array');
  return jpeg;
};

const useImagePreview = (): string | null => {
  const { state, dispatch } = useRootContext();
  const { file, previewURL } = EditorDuck.selectors.getImage(state);

  React.useEffect(() => {
    if (file === null) return;
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL;
    (async () => {
      const imageFile =
        file.type === 'image/heic' ? await convertHeicToJpeg(file) : file;
      const url = createObjectURL(imageFile);
      dispatch(EditorDuck.actions.setImage({ file, previewURL: url }));
    })();
  }, [file]);

  return previewURL;
};

export default useImagePreview;

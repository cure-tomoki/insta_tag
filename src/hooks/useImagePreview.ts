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
  const { state } = useRootContext();
  const file = EditorDuck.selectors.getImageFile(state);
  const [previewImageURL, setPreviewImageURL] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (file === null) return;
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL;
    (async () => {
      const imageFile =
        file.type === 'image/heic' ? await convertHeicToJpeg(file) : file;
      setPreviewImageURL(createObjectURL(imageFile));
    })();
  }, [file]);

  console.log(previewImageURL);
  return previewImageURL;
};

export default useImagePreview;

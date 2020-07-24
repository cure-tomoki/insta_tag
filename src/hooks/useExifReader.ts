import ExifReader from 'exifreader';
import * as React from 'react';

import * as EditorDuck from '~/ducks/EditorDuck';
import useRootContext from '~/hooks/useRootContext';
import { assert } from '~/utils/commonUtils';
import { parseExifDate } from '~/utils/dateUtils';

const getMakeModel = (make?: string, model?: string): string | undefined => {
  if (model === undefined) {
    return undefined;
  } else if (make === undefined || model?.includes(make)) {
    return model;
  } else {
    return [make, model].join(' ');
  }
};

const readExifData = async (imageFile: File): Promise<Instatag.ExifData> => {
  assert(imageFile !== null, 'image file was not provided');
  const fileBuffer = await imageFile.arrayBuffer();
  const exif = ExifReader.load(fileBuffer);
  console.info({ exif });
  return {
    createdDate: parseExifDate(exif.DateTime?.description),
    camera: {
      makeModel: getMakeModel(exif.Make?.description, exif.Model?.description),
      make: exif.Make?.description,
      model: exif.Model?.description,
    },
    lens: {
      makeModel: exif.LensModel?.description,
      make: exif.LensMake?.description,
      model: exif.LensModel?.description,
    },
    settings: {
      focalLength: exif.FocalLength?.description,
      iso: exif.ISOSpeedRatings?.description,
      fNumber: exif.FNumber?.description,
      shutterSpeed: exif.ShutterSpeedValue?.description,
    },
  };
};

const useExifReader = () => {
  const { state, dispatch } = useRootContext();
  const file = EditorDuck.selectors.getImageFile(state);

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
};

export default useExifReader;

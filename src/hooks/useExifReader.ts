import ExifReader from 'exifreader';
import * as React from 'react';

import { assert } from '~/utils/commonUtils';
import { parseExifDate } from '~/utils/dateUtils';

const useExifReader = (file: File | null) => {
  const previewImageURL = React.useMemo(() => {
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL;
    return file ? createObjectURL(file) : null;
  }, [file]);

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
      creatiedDate: parseExifDate(exif.DateTime.description),
      camera: {
        makeModel: getMakeModel(
          exif.Make?.description,
          exif.Model?.description
        ),
        make: exif.Make?.description,
        model: exif.Model?.description,
      },
      lens: {
        makeModel: getMakeModel(
          exif.LensMake?.description,
          exif.LensModel?.description
        ),
        make: exif.LensMake?.description,
        model: exif.LensModel?.description,
      },
      settings: {
        iso: exif.ISOSpeedRatings?.description,
        fNumber: exif.FNumber?.description,
        shutterSpeed: exif.ShutterSpeedValue?.description,
      },
    };
  };

  return {
    image: {
      file,
      previewImageURL,
    },
    readExifData,
  };
};

export default useExifReader;

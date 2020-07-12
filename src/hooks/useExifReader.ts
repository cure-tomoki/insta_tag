import ExifReader from 'exifreader';
import * as React from 'react';

import { assert } from '~/utils/commonUtils';

const useExifReader = (file: File | null) => {
  const previewImageURL = React.useMemo(() => {
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL;
    return file ? createObjectURL(file) : null;
  }, [file]);

  const readExifData = async (imageFile: File): Promise<Instatag.ExifData> => {
    assert(imageFile !== null, 'image file was not provided');
    const fileBuffer = await imageFile.arrayBuffer();
    const exif = ExifReader.load(fileBuffer);
    return {
      date: exif.DateTime.description,
      cameraModel: exif.Model.description,
      lensModel: exif.LensModel.description,
      settings: {
        iso: exif.ISOSpeedRatings.description,
        fNumber: exif.FNumber.description,
        shutterSpeed: exif.ShutterSpeedValue.description,
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

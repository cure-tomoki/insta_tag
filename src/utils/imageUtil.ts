import ExifReader from 'exifreader';
import heic2any from 'heic2any';

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

export const readExifData = async (
  imageFile: File
): Promise<Instatag.ExifData> => {
  assert(imageFile !== null, 'image file was not provided');
  const fileBuffer = await imageFile.arrayBuffer();
  const exif = ExifReader.load(fileBuffer);
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

const convertHeicToJpeg = async <x extends File>(heic: x): Promise<Blob> => {
  const jpeg = await heic2any({
    blob: heic,
    toType: 'image/jpeg',
    quality: 0.3,
  });
  assert(!Array.isArray(jpeg), 'result of heic2any should not be an array');
  return jpeg;
};

export const createImagePreviewURL = async (
  file: File
): Promise<string | null> => {
  if (file === null) return null;
  const createObjectURL = (window.URL || window.webkitURL).createObjectURL;
  const imageFile =
    file.type === 'image/heic' ? await convertHeicToJpeg(file) : file;
  const url = createObjectURL(imageFile);
  return url;
};

import { assert } from '~/utils/commonUtils';
import { parseExifDate } from '~/utils/dateUtils';

// lazy load exifreader library
const loadExifReader = async () => {
  const ExifReader = await import(
    /* webpackChunkName: "exifreader" */ 'exifreader'
  );
  return ExifReader.default;
};

// lazy load heic2any library
const loadHeic2any = async () => {
  const heic2any = await import(/* webpackChunkName: "heic2any" */ 'heic2any');
  return heic2any.default;
};

// reimplements arrayBuffer using FileReader
const getArrayBuffer = async (target: File | Blob): Promise<ArrayBuffer> => {
  const arrayBuffer =
    target instanceof File
      ? File.prototype.arrayBuffer
      : Blob.prototype.arrayBuffer;
  if (arrayBuffer !== undefined) {
    return await target.arrayBuffer();
  }
  // arrayBuffer is undefined
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      assert(reader.result instanceof ArrayBuffer);
      resolve(reader.result);
    };
    reader.readAsArrayBuffer(target);
  });
};

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
  const fileBuffer = await getArrayBuffer(imageFile);
  const exif = (await loadExifReader()).load(fileBuffer);
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

export const generateExifText = (exif: Instatag.ExifData): string => {
  const EMPTY_LINE = '.';
  const text = [
    exif.createdDate,
    EMPTY_LINE,
    (exif.camera?.makeModel || exif.lens?.makeModel) &&
      [exif.camera?.makeModel, exif.lens?.makeModel]
        .filter(Boolean)
        .join(' / '),
    (exif.settings?.iso ||
      exif.settings?.fNumber ||
      exif.settings?.shutterSpeed) &&
      [
        exif.settings?.iso && `ISO: ${exif.settings?.iso}`,
        exif.settings?.fNumber && `A: ${exif.settings?.fNumber}`,
        exif.settings?.shutterSpeed && `T: ${exif.settings?.shutterSpeed}s`,
      ]
        .filter(Boolean)
        .join(' / '),
    EMPTY_LINE,
  ]
    .filter(Boolean)
    .join('\n');
  return text;
};

const convertHeicToJpeg = async <x extends File>(heic: x): Promise<Blob> => {
  const jpeg = await (await loadHeic2any())({
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

declare namespace Instatag {
  interface ExifData {
    creatiedDate?: string;
    camera?: {
      makeModel?: string;
      make?: string;
      model?: string;
    };
    lens?: {
      makeModel?: string;
      make?: string;
      model?: string;
    };
    settings?: {
      iso?: string;
      focalLength?: string;
      fNumber?: string;
      shutterSpeed?: string;
    };
  }
}

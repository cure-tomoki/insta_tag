declare namespace Instatag {
  interface ExifData {
    date?: string;
    cameraModel?: string;
    lensModel?: string;
    settings?: {
      iso?: string;
      focalLength?: string;
      fNumber?: string;
      shutterSpeed?: string;
    };
  }
}

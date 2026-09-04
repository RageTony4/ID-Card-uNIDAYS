import piexif from 'piexifjs';

export function canvasToIPhoneJpeg(canvas: HTMLCanvasElement, quality: number = 0.95): string {
  // Convert canvas to pristine JPEG data URL
  const rawJpegDataUrl = canvas.toDataURL('image/jpeg', quality);

  try {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hours = pad(now.getHours());
    const mins = pad(now.getMinutes());
    const secs = pad(now.getSeconds());
    const dateStr = `${year}:${month}:${day} ${hours}:${mins}:${secs}`;

    const offsetMinutes = -now.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absOffset = Math.abs(offsetMinutes);
    const offsetHours = pad(Math.floor(absOffset / 60));
    const offsetMins = pad(absOffset % 60);
    const offsetStr = `${sign}${offsetHours}:${offsetMins}`;

    const zeroth: Record<number, any> = {};
    const exif: Record<number, any> = {};
    const gps: Record<number, any> = {};

    // 0th IFD (Main image EXIF tags for iPhone 15 Pro)
    zeroth[piexif.ImageIFD.Make] = "Apple";
    zeroth[piexif.ImageIFD.Model] = "iPhone 15 Pro";
    zeroth[piexif.ImageIFD.Software] = "17.5.1";
    zeroth[piexif.ImageIFD.Orientation] = 1;
    zeroth[piexif.ImageIFD.XResolution] = [72, 1];
    zeroth[piexif.ImageIFD.YResolution] = [72, 1];
    zeroth[piexif.ImageIFD.ResolutionUnit] = 2;
    zeroth[piexif.ImageIFD.DateTime] = dateStr;
    zeroth[piexif.ImageIFD.HostComputer] = "iPhone 15 Pro";

    // Exif IFD (Camera settings)
    exif[piexif.ExifIFD.ExposureTime] = [1, 120]; // 1/120s
    exif[piexif.ExifIFD.FNumber] = [178, 100]; // f/1.78
    exif[piexif.ExifIFD.ExposureProgram] = 2; // Normal program
    exif[piexif.ExifIFD.ISOSpeedRatings] = 80;
    exif[piexif.ExifIFD.ExifVersion] = "0232";
    exif[piexif.ExifIFD.DateTimeOriginal] = dateStr;
    exif[piexif.ExifIFD.DateTimeDigitized] = dateStr;
    exif[piexif.ExifIFD.ShutterSpeedValue] = [6906, 1000];
    exif[piexif.ExifIFD.ApertureValue] = [166, 100];
    exif[piexif.ExifIFD.BrightnessValue] = [520, 100];
    exif[piexif.ExifIFD.ExposureBiasValue] = [0, 1];
    exif[piexif.ExifIFD.MeteringMode] = 5; // Pattern
    exif[piexif.ExifIFD.Flash] = 16; // Flash off
    exif[piexif.ExifIFD.FocalLength] = [686, 100]; // 6.86 mm
    exif[piexif.ExifIFD.FocalLengthIn35mmFilm] = 24;
    exif[piexif.ExifIFD.SensingMethod] = 2;
    exif[piexif.ExifIFD.SceneType] = 1;
    exif[piexif.ExifIFD.ExposureMode] = 0;
    exif[piexif.ExifIFD.WhiteBalance] = 0;
    exif[piexif.ExifIFD.LensMake] = "Apple";
    exif[piexif.ExifIFD.LensModel] = "iPhone 15 Pro back triple camera 6.86mm f/1.78";
    exif[piexif.ExifIFD.LensSpecification] = [[222, 100], [900, 100], [178, 100], [280, 100]];
    exif[piexif.ExifIFD.OffsetTime] = offsetStr;
    exif[piexif.ExifIFD.OffsetTimeOriginal] = offsetStr;
    exif[piexif.ExifIFD.OffsetTimeDigitized] = offsetStr;

    const exifObj = { "0th": zeroth, "Exif": exif, "GPS": gps };
    const exifBytes = piexif.dump(exifObj);

    // Clean raw jpeg from canvas metadata & insert iPhone EXIF
    const cleanJpeg = piexif.remove(rawJpegDataUrl);
    return piexif.insert(exifBytes, cleanJpeg);
  } catch (err) {
    console.error("Failed to attach EXIF metadata:", err);
    return rawJpegDataUrl;
  }
}

export function imageUrlToIPhoneJpeg(imgDataUrl: string, quality: number = 0.95): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(imgDataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0);
      try {
        const result = canvasToIPhoneJpeg(canvas, quality);
        resolve(result);
      } catch (err) {
        console.error('Failed to attach EXIF metadata', err);
        resolve(canvas.toDataURL('image/jpeg', quality));
      }
    };
    img.onerror = () => {
      resolve(imgDataUrl);
    };
    img.src = imgDataUrl;
  });
}

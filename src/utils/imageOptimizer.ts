export interface OptimizedImageResult {
  dataUrl: string;
  width: number;
  height: number;
  sizeKB: number;
}

const MAX_DIMENSION = 1400;
const MAX_DATA_URL_LENGTH = 720000; // Safely below Firestore 800KB validation ceiling & 1MB doc limit

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Unable to read image file.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Unsupported or corrupted image format.'));
    img.src = src;
  });
}

/**
 * Resizes and compresses an uploaded image client-side so it loads quickly
 * and fits comfortably within Firestore document size boundaries.
 */
export async function optimizeImageForStorage(
  file: File
): Promise<OptimizedImageResult> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Veuillez sélectionner un fichier image (JPG, PNG ou WebP).');
  }

  const rawDataUrl = await readFileAsDataUrl(file);
  const img = await loadImage(rawDataUrl);

  let targetWidth = img.naturalWidth || img.width;
  let targetHeight = img.naturalHeight || img.height;

  if (targetWidth > MAX_DIMENSION || targetHeight > MAX_DIMENSION) {
    const ratio = Math.min(
      MAX_DIMENSION / targetWidth,
      MAX_DIMENSION / targetHeight
    );
    targetWidth = Math.max(1, Math.round(targetWidth * ratio));
    targetHeight = Math.max(1, Math.round(targetHeight * ratio));
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context is unavailable in this browser.');
  }

  const qualities = [0.84, 0.75, 0.65, 0.52, 0.4];
  let bestDataUrl = '';
  let currentWidth = targetWidth;
  let currentHeight = targetHeight;

  for (let pass = 0; pass < 2; pass++) {
    canvas.width = currentWidth;
    canvas.height = currentHeight;
    ctx.clearRect(0, 0, currentWidth, currentHeight);
    ctx.drawImage(img, 0, 0, currentWidth, currentHeight);

    for (const quality of qualities) {
      let encoded = canvas.toDataURL('image/webp', quality);
      if (!encoded.startsWith('data:image/webp')) {
        encoded = canvas.toDataURL('image/jpeg', quality);
      }

      bestDataUrl = encoded;
      if (encoded.length <= MAX_DATA_URL_LENGTH) {
        return {
          dataUrl: encoded,
          width: currentWidth,
          height: currentHeight,
          sizeKB: Math.round((encoded.length * 3) / 4 / 1024),
        };
      }
    }

    // Second pass: gently step down dimensions for very large images
    currentWidth = Math.max(480, Math.round(currentWidth * 0.72));
    currentHeight = Math.max(360, Math.round(currentHeight * 0.72));
  }

  if (bestDataUrl.length > MAX_DATA_URL_LENGTH) {
    throw new Error(
      "L'image reste trop volumineuse après compression. Essayez une image plus légère."
    );
  }

  return {
    dataUrl: bestDataUrl,
    width: currentWidth,
    height: currentHeight,
    sizeKB: Math.round((bestDataUrl.length * 3) / 4 / 1024),
  };
}

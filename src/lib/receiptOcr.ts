export async function recognizeReceiptText(file: File): Promise<string> {
  const image = await preprocessReceiptImage(file);
  const tesseract = await import("tesseract.js");
  const recognize = tesseract.recognize ?? tesseract.default.recognize;
  const result = await recognize(image, "ind+eng", {
    logger: () => undefined,
  });

  return result.data.text;
}

async function preprocessReceiptImage(file: File): Promise<HTMLCanvasElement> {
  const bitmap = await loadImageBitmap(file);
  const scale = getScaleFactor(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return canvas;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let index = 0; index < data.length; index += 4) {
    const gray = 0.299 * data[index] + 0.587 * data[index + 1] + 0.114 * data[index + 2];
    const contrasted = Math.min(255, Math.max(0, (gray - 128) * 1.65 + 128));
    data[index] = contrasted;
    data[index + 1] = contrasted;
    data[index + 2] = contrasted;
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
}

function getScaleFactor(width: number, height: number): number {
  const longestSide = Math.max(width, height);
  if (longestSide < 600) return 3;
  if (longestSide < 1000) return 2;
  return 1.5;
}

async function loadImageBitmap(file: File): Promise<ImageBitmap> {
  if ("createImageBitmap" in window) {
    return createImageBitmap(file);
  }

  const image = await loadImageElement(file);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  context?.drawImage(image, 0, 0);

  return createImageBitmap(canvas);
}

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Gambar struk tidak bisa dibaca."));
    };
    image.src = url;
  });
}

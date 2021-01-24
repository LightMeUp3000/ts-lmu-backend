import * as fs from "fs";
import * as getColors from "get-image-colors";
import * as path from "path";

export class PicturesService {
  private imageDataString;
  private imageFormat;

  private getColorsOptions;

  constructor(imageDataString, imageFormat) {
    this.imageDataString = imageDataString;
    this.imageFormat = imageFormat;

    this.getColorsOptions = {
      count: 6,
      type: `image/${imageFormat}`,
    };
  }

  public async getColors() {
    const finalPath = await this.savePicture();

    return getColors(finalPath, this.getColorsOptions);
  }

  public setOptions(options) {
    this.getColorsOptions = options;
  }

  private async savePicture() {
    return new Promise((resolve, reject) => {
      const fullPath = path.resolve(
        path.join(
          process.env.IMG_TEMP_PATH || "img",
          `${Date.now()}-lmu-tmp-img.${this.imageFormat}`
        )
      );

      fs.writeFile(
        fullPath,
        this.imageDataString,
        { encoding: "base64" },
        (e) => {
          if (e) {
            reject(e);
          }

          resolve(fullPath);
        }
      );
    });
  }
}

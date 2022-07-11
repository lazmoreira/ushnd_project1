import sharp from "sharp";
import path from "path";
import { existsSync } from "fs";

const resizer = async (imageName: string, width: number, height: number): Promise<string> => {
    try {
        const imagePath = path.resolve(`./assets/images/${imageName}.jpg`);

        if (existsSync(imagePath)) {
            await sharp(imagePath).resize(width, height).toFile(path.resolve(`./assets/images/thumbs/${imageName}.jpg`))

            const resizedImage = path.resolve(`./assets/images/thumbs/${imageName}.jpg`);

            if (!existsSync(resizedImage)) {
                throw new Error(`Image ${imageName}.jpeg could not be resized`)
            }

            return resizedImage;
        }
        else {
            throw new Error(`Image ${imageName}.jpeg was not found`)
        }
    } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : 'Errors found';

        throw errMsg;
    }
}

export default resizer;
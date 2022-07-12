import express from 'express';
import resizer from '../../utilities/resizer';
import NodeCache from 'node-cache';

const images = express.Router();
const cacheObj = new NodeCache();

images.get('/', async (req: express.Request, res: express.Response) => {
    try {
        let errorMsg = '';

        if (typeof req.query.image == 'undefined') {
            errorMsg = `The image name is not included in the URL. Use the format: /api/images?image=IMAGE_NAME&height=999&width=999`;
        }

        if (typeof req.query.height == 'undefined') {
            errorMsg += errorMsg != '' ? '<br/>' : '';
            errorMsg += `The image height is not included in the URL. Use the format: /api/images?image=IMAGE_NAME&height=999&width=999`;
        }

        if (typeof req.query.width == 'undefined') {
            errorMsg += errorMsg != '' ? '<br/>' : '';
            errorMsg += `The image width is not included in the URL. Use the format: /api/images?image=IMAGE_NAME&height=999&width=999`;
        }

        if (errorMsg != '') {
            res.status(400);
            res.send(errorMsg);
        } else {
            if (cacheObj.has(req.originalUrl)) {
                res.sendFile(cacheObj.get(req.originalUrl) as string);
            } else {
                const imageName = req.query.image as string;
                const imageWidth = parseInt(req.query.width as string);
                const imageHeight = parseInt(req.query.height as string);

                const resizedImage = await resizer(imageName, imageWidth, imageHeight);

                cacheObj.set(req.originalUrl, resizedImage);
                res.sendFile(resizedImage);
            }
        }
    } catch (e: unknown) {
        res.status(400);
        res.send(e);
    }
});

export default images;

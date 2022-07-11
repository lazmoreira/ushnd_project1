import express from 'express';
import resizer from '../../utilities/resizer';

const images = express.Router();

images.get('/', async (req, res) => {
    try {
        let errorMsg = '';

        if (typeof req.query.image == 'undefined') {
            errorMsg = `The image name is not included in the URL. Use the format: /api/images?image=IMAGE_NAME&height=999&width=999`;
        }

        if (typeof req.query.height == 'undefined') {
            errorMsg += (errorMsg != '') ? '<br/>' : '';
            errorMsg += `The image height is not included in the URL. Use the format: /api/images?image=IMAGE_NAME&height=999&width=999`;
        }

        if (typeof req.query.width == 'undefined') {
            errorMsg += (errorMsg != '') ? '<br/>' : '';
            errorMsg += `The image width is not included in the URL. Use the format: /api/images?image=IMAGE_NAME&height=999&width=999`;
        }

        if (errorMsg != '') {
            res.status(400);
            res.send(errorMsg);
        }
        else {
            const imageName = req.query.image as string;
            const imageWidth = parseInt(req.query.width as string);
            const imageHeight = parseInt(req.query.height as string);

            const resizedImage = await resizer(imageName, imageWidth, imageHeight);

            res.sendFile(resizedImage);
        }
    } catch (e: unknown) {
        res.status(400);
        res.send(e);
    }

});

export default images;
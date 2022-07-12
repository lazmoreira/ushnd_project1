import supertest from 'supertest';
import app from '../index';
import resizer from '../utilities/resizer';
import path from 'path';

const request = supertest(app);

describe('Test images resizer', () => {
    it('Checks if the new thumb image was created', async () => {
        const result = await resizer('palmtunnel', 200, 200);
        expect(result).toBe(path.resolve(`./assets/images/thumbs/palmtunnel.jpg`));
    });

    it('Checks if the it throws the correct error when the image does not exists', async () => {
        await expectAsync(resizer('ximage', 200, 200)).toBeRejectedWith(
            'Image ximage.jpeg was not found'
        );
    });
});

describe('Test images endpoint', () => {
    it('Get the images endpoint with a correct request', async () => {
        const response = await request.get(
            '/api/images?image=fjord&width=200&height=200'
        );
        expect(response.status).toBe(200);
    });

    it('Get the images endpoint with a incorrect request', async () => {
        const response = await request.get('/api/images?image=fjord&width=200');
        expect(response.status).toBe(400);
    });
});

import { APIGatewayEvent } from 'aws-lambda';
import imageType from 'image-type';
import axios from 'axios';

export const main = async (event: APIGatewayEvent) => {
    const queryString = event.queryStringParameters;
    try {
        const image = await fetchImage(queryString.url);
        const type = imageType(image);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': type.mime,
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            body: image.toString('base64'),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'unable to return the image',
        };
    }
};

const fetchImage = (imageURL: string) => {
    return axios
        .get(imageURL, { responseType: 'arraybuffer' })
        .then(response => Buffer.from(response.data, 'base64'));
};

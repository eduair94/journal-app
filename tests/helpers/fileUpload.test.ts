import 'dotenv/config'
import { fileUpload} from '../../src/helpers/fileUpload'
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'react-journal-eduair', 
  api_key: '194285255141696', 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

describe('Test fileUpload', () => { 
    test('should upload a file and return the URL', async() => {
        const image = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        // Convert imageUrl into a file
        const response = await fetch(image);
        // here image is url/location of image
        const blob = await response.blob();
        const file = new File([blob], 'image.png', {type: blob.type});
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
        // Remove image from cloudinary
        if(url) {
            const segments = url.split('/');
            const public_id = segments[segments.length - 1].split('.')[0];
            await cloudinary.api.delete_resources([public_id]);
        }
    }, 40000);
    // test('should return null', async() => {
    //     const file = new File([], 'foto.jpg');
    //     const url = await fileUpload(file);
    //     expect(url).toBe(null);
    // });
 })
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
cloudinary.config({ 
    cloud_name: 'dgemvdcue', 
    api_key: process.env.CLOUDINARY_APIKEY, 
    api_secret: process.env.CLODINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

export async function POST(request:NextRequest){
    try {
        const { image } =await request.json(); // image should be a base64 string
        console.log(image)
        const uploadedResponse = await cloudinary.uploader.upload(image, {
          folder: "blog_images",
        });
  
        return NextResponse.json({ imageUrl: uploadedResponse.secure_url });
      } catch (error) {
        return NextResponse.json({ error: error },{status:500});
      }
}
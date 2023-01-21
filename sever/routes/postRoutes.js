import express from 'express';

import * as dotenv from 'dotenv';

import {v2  as cloudinary} from 'cloudinary'


import Post from '../mongodb/models/post.js'


dotenv.config();

const router = express.Router();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

//GET ALL POST

router.route('/').get(async(req,res)=>{
    try {
        const posts = await Post.find({});

        res.status(200).json({
            success:true,
            data:posts,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error,
        })
    }
})

// CREATE A POST

router.route('/').post(async(req,res)=>{
    try{
        const {name,prompt,photo}  = req.body;
    // here photo is coming from the frontend 
    // uploading photo to cloudinary
    // then we get cloudinary optimized url
    const photoUrl = await cloudinary.uploader.upload(photo);
    
    // here we just pass the photo url (cloudinary)
    const newPost =  await Post.create({
        name,
        prompt,
        photo:photoUrl.url,
    })
    res.status(201).json({
        success:true,
        data:newPost,
    })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
})






// export default

 export default router;
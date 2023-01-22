import mongoose from 'mongoose';

const connectDB = (url)=>{
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
    .then(()=>{
        return console.log('MongoDB connected');
    }).catch((err)=>{
        return console.log(err);
    })
}


export default connectDB;
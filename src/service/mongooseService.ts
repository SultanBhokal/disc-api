import mongoose from "mongoose";

const uri = process.env.MONGO_URL || "mongodb+srv://developergusioni7:kGd6k0Yd0HcJNKVK@cluster0.nzxzysy.mongodb.net/?retryWrites=true&w=majority";
let count = 1;

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(uri).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. '+err, ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

export default mongoose;
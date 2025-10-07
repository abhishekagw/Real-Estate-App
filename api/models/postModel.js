import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    address:{
        type:String,
        
    },
    city:{
        type:String,
        
    },
    bedroom:{
        type:Number,
      
    },
    bathroom:{
        type:Number,
        
    },
    latitude:{
        type:String,
        
    },
    longitude:{
        type:String,
        
    },
    Type:{
        type:String,
        enum:["buy","rent"],
        required:true
    },
    Property:{
        type:String,
        enum:["appartment","house","condo"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

});

const Post = mongoose.model("Post", postSchema);
export default Post;

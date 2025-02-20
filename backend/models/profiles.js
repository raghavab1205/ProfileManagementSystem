import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user_id:{
        type : String,
        required: true
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    age: { 
        type: Number, 
        required: true 
    }
},{
    timestamps: true // add createdAt and updatedAt fields
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
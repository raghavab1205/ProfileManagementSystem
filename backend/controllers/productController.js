import Profile from "../models/profiles.js";

export const getProfiles = async (req, res) => {
    try {
         const profiles = await Profile.find({});
         res.status(200).json({success: true, data: profiles});
    } catch (error) {
         console.error("Error in fetching profiles: ${error.message}");
         res.status(500).json({success: false, message: "Server error"});
    } 
 }

 export const addProfile = async (req, res) => {
    const profile = req.body;

    if(!profile.user_id || !profile.name || !profile.email || !profile.age) {
        return res.status(400).json({success: false, message: "All fields are required" });
    }

    const newProfile = new Profile(profile);
    
    try {
        await newProfile.save();
        res.status(201).json({success: true, data: newProfile});
    } catch (error) {
        console.error(`Error in creating profile: ${error.message}`);
        res.status(500).json({success: false, message: "Server error"});
    }
}

export const editProfile = async (req, res) => {
    const id = req.params.user_id;

    const profile = req.body;

    if(!Profile.exists({user_id: id})) {
        return res.status(404).json({success: false, message: "Profile not found."});
    }

    try {
        const updatedProfile = await Profile.findOneAndUpdate({user_id : id}, profile, {new : true});
        res.status(200).json({success: true, data: updatedProfile});
    } catch (error) {
        console.error(`Error in updating profile: ${error.message}`);
        res.status(500).json({success: false, message: "Server error"});
        
    }
}

export const deleteProfile = async (req, res) => {
    const id = req.params.user_id;

    if(!Profile.exists({user_id: id})) {
        return res.status(404).json({success: false, message: "Profile not found."});
    }

    try {
        await Profile.deleteOne({user_id: id});
        res.status(200).json({success: true, message:"Profile deleted successfully"});
    } catch (error) {
        console.error(`Error in deleting profile: ${error.message}`);
        res.status(500).json({success: false, mesage: "Profile not found."});
    }
}
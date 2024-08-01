const User=require("../models/userModel")

const createUser=async(userData)=>{
    try{
        const isPresent= await User.findOne({username:userData.userName})
        if(isPresent){
            throw new Error("User already Exist");
        }
        const user= new User({username:userData.username,password:userData.password});
        const data=await user.save();
        if(!data){
            throw new Error("Failed to create User")
        }
        return true;
    }catch(error){
        console.log(error)
        throw error;
    }
};

const logout=async(token)=>{
    try{
        console.log(token)
        const user=await User.findOne({token});
        user.token=null;
        await user.save();
        return user;
    }catch(error){
        console.log(error)
        throw error
    }
}

const getUser=async()=>{
    try{
        const users=await User.find();
        return users;
    }catch(error){
        console.log("error")
        throw error;
    }
}

const getUserById=async(username)=>{
    try{
        const user=await User.findOne({username})
        return user;
    }catch(error){
        console.log("error")
        throw error;
    }
}
const getUserByToken = async (token) => {
    try {
        const user = await User.findOne({ token });
        return user;
    } catch (error) {
        throw error;
    }
};

const updateUser=async (username,updateData)=>{
    try{        
        const user=await User.findOne({username});
        if(!user){
            throw new Error("Invalid user")
        }
        const updateUser=await User.findByIdAndUpdate(user._id,updateData,{
            new:true
        });

        return updateUser;
    }catch(error){
        console.log(error)
        throw error;
    }
}

const deleteUser=async(id)=>{
    try{
        const user=await User.findOne({username});
        if(!user){
            throw new Error("Invalid user")
        }
        const updateUser=await User.findByIdAndDelete(user._id);

        return true;
    }catch(error){
        throw error;
    }
}




module.exports={
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    logout,
    getUserByToken
}
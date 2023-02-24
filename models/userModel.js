const mongoose=require("mongoose");
const {isEmail}=require("validator");
const userSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"pls enter your firstname"],
        maxLength:[30,"username cannaot exceed 30 character"],
        minLength:[4,"username cannot exceed 4 character"],
    },
    lastname:{
        type:String,
        required:[true,"pls enter your lastname"],
        maxLength:[30,"username cannaot exceed 30 character"],
        minLength:[4,"username cannot exceed 4 character"],
    },

    email:{
        type:String,
        required:[true,"pls enter your email"],
        unique:true,
        // validate:[validator.isEmail,"pls enter a valid email address"],
        lowercase:true,

        
    },
    password:{
        type:String,
        required:[true,"pls enter your password"],
        minLength:8,
    
        select:false,
    },
    confirmpassword:{
        type:String,
        required:[true,"pls enter your confirm password"],
        minLength:8,
    
        select:false,
    },
    phone:{
        type:[Number,"please enter your phone number"],
        unique:true,
        required:"true",
    },
    gender:{
        type:String,
        possibleValues:["male","female","other"]
    },
    

    avatar:{
        public_id:{
            type:String,
            required:false,
        },
        url:{
            type:String,
            required:false,
        },
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})
module.exports=mongoose.model("User",userSchema)
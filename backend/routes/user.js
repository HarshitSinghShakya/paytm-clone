const {User,Account,userzodSchema}=require("../db")
const jwt=require("jsonwebtoken");
const express=require("express");
const zod=require("zod");
const bcrypt=require("bcrypt");
const JWT_SECRET = require("../config");
const router =express.Router();
const {authMiddleware, authMiddleware}=require("../middleware");
router.post("/signup",async (req,res)=>{
    const body=req.body;
    const parsed=userzodSchema.safeParse(body);
    if(!parsed.success){
        return res.status(404).json({msg:"Email already taken/ incorrect input"});
    }
    const user= await User.findOne({
        username:body.username
    })
    if(user._id){
        return res.status(400).json({msg:"Email already taken/ incorrect input"});
    }
    const dbUser=await User.create(body);
    const userId=user._id;
    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET);
    res.json({
        msg:"User created successfully",
        token:token
    });
});
router.post("/signin",async (req,res)=>{
    const body=req.body;
    const parsed=userzodSchema.safeParse(body);
    if(!parsed.success){
        return res.status(404).json({msg:"Invalid input"});
    }
    try{
        const user=await User.findOne({username:body.username});
        if(!user){
            return res.status(401).json({msg:"User not found"});
        }
        const passwordmatch=await bcrypt.compare(body.password,user.password);
        if(!passwordmatch){
            return res.status(401).json({msg:"Incorrect password"});
        }
        const token=jwt.sign({id:user._id,username:body.username},JWT_SECRET);
        return res.status(200).json({msg:"Login successful"});
    }catch(err){
        return res.status(500).json({ msg: "Internal Server Error", error: err.message });
    }
});
const updateBody=zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional()
})
router.put("/",authMiddleware,async (req,res)=>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Error while updating information"
        })
    }
    await User.updateOne({ _id: req.userId }, req.body)
    res.json({
        msg:"Updated successfully"
    })
})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports=router;

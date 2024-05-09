const {PrismaClient} = require("@prisma/client")
const Prisma  = new PrismaClient();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailer = require("../utils/email")


const registerUser = async(req,res)=>{
    const {firstname,lastname,role,email,password,emailVerified} = req.body;
    console.log("reqbody",req.body);
    try{
    const result = await Prisma.user.deleteMany();
    console.log("res",result);
        const saltRound = 10;
        const hashpassword = await bcrypt.hash(password, saltRound);
        const user = {
            firstname,
            lastname,
            email,
            password:  hashpassword,
            emailVerified,
            role
        }
        const presetuser  = await Prisma.user.findUnique({
            where:{
                email:email
            }
        });
        if(presetuser)
           res.send({error_message:"User already exist with this Email"})
        
        else{
            const newUser = await Prisma.user.create({ data: user })
            console.log("new user",newUser)
            if(newUser)
            {
                const token = await Prisma.token.create({
                    data: {
                        token: crypto.randomBytes(20).toString('hex'),
                        userId:newUser.id
                    }
                })
                 mailer(newUser.email,`http://localhost:5000/verify-email?token=${token.token}&id=${newUser.id}`)
        
                res.send({newuser:newUser,message:"Sent mail and User registered successfully ",token:token})
            }
           
        }
        
    }
    catch(err)
    {
        console.log("error",err)
        res.send({err:err})
    }
}
const loginUser = async(req,res)=>{
    const{email,password} = req.body;
   try{
       const user = await Prisma.user.findUnique({
           where:{
               email:email,
           }
       })
      
       if(!user)
        res.send({error_message: "User not found"})
       else if(user.role != 'ADMIN')
        res.send({error_message:"You are not allowed to login"})
       else if(!user.emailVerified)
        res.send({error_message:"Please verify your email For login"})
       
       else{
           const isMatch = await bcrypt.compare(password,user.password);
           if(!isMatch)
           {
               res.send({error_message:"Invalid password"})
           }
           else{
               const update_user = await Prisma.user.update({
                where:{
                    email:email
                },
                data:{
                    emailVerified:true
                }
               })
               res.send({message:"User found",user:update_user})
           }
       }

   }catch(err)
   {
     console.log("error",err)
     res.send({err:err})
   }
} 

module.exports = {registerUser,loginUser}


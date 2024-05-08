const {PrismaClient} = require('@prisma/client')
const Prisma =  new PrismaClient();

const verifyEmail = async(req,res)=>{
  const {token,id} = req.query;
  try{
    const newtoken = await Prisma.token.findUnique({
        where:{
          token: token,
          userId: parseInt(id) 
        }
    })
    if(newtoken)
    {
      const user = await Prisma.user.update(
        {
          where:{
            id: parseInt(id)
          },
          data:{
            emailVerified: true
          }
        })
      console.log("user",user)
      res.send({message:"email verify successfully"})
    }
   
     else
       res.send({message:"Not valid ID or Token"})
 }
   
 catch(error)
 {
    console.log("errr",error)
    res.send(error)
 }
}

module.exports = {verifyEmail};

const home = async (req,res)=>{
    try {
        res.status(200).send({message:"Authenticated form Home"});
    } catch (error) {
     console.log(error.message);   
    }
}


const about = async(req,res)=>{
    try{
        res.status(200).send({meaage:"Authenticated from about"});
    }catch(error){
        console.log(error.message);
    }
}

module.exports = {
    home,
    about,
}
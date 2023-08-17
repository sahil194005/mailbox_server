const EmailSchema = require('../Model/Emails')


const SendEmail = async(req, res) => {
    try {
        let finalObj = { sender: req.User.email, ...req.body }
        await EmailSchema.create(finalObj);
        res.status(201).json({ msg: "mail sent", success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"cannot send mail",success:false})
    }
}


const getEmail = async (req, res) => {
    try {
        const userEmail = req.User.email;
        const data =await EmailSchema.find({ receiver: userEmail });
        res.status(201).json({msg:'got all mails',data:data,success:true})  
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:"cannot get the mails",success:false})
    }
}


module.exports = { SendEmail,getEmail };
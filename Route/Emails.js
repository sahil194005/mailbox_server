const Express = require('express');
const AuthUser = require('../Auth/AuthUser');
const { SendEmail,getEmail,getSingleEmail,DeleteMail} = require('../Controller/Emails');
const router = Express.Router();

router.route('/send').post(AuthUser, SendEmail);
router.route('/get').get(AuthUser, getEmail)
router.route('/get/:id').get(AuthUser, getSingleEmail)
router.route('/isDelete/:id').patch(AuthUser,DeleteMail)

module.exports = router;
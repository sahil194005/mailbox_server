const Express = require('express');
const AuthUser = require('../Auth/AuthUser');
const { SendEmail,getEmail,getSingleEmail,DeleteMail,getSentMail} = require('../Controller/Emails');
const router = Express.Router();

router.route('/send').post(AuthUser, SendEmail);
router.route('/get').get(AuthUser, getEmail)
router.route('/get/:id').get(AuthUser, getSingleEmail)
router.route('/isDelete/:id').patch(AuthUser, DeleteMail)
router.route('/getSentMail').get(AuthUser, getSentMail);

module.exports = router;
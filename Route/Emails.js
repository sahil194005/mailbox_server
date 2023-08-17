const Express = require('express');
const AuthUser = require('../Auth/AuthUser');
const { SendEmail,getEmail} = require('../Controller/Emails');
const router = Express.Router();

router.route('/send').post(AuthUser, SendEmail);
router.route('/get').get(AuthUser,getEmail)

module.exports = router;
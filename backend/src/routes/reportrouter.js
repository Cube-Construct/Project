const Express = require('express');
const router = Express.Router();
const userController = require('../controllers/usercontroller');
const reportController = require('../controllers/reportcontroller');


router.post(
    '/verification/report',
    userController.auth,
    reportController.createReport
);

module.exports = router;
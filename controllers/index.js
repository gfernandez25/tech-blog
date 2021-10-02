const router = require('express').Router();

const authRoutes = require('./authentication-routes');
const postRoutes = require('./post-routes');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api/');

router.get('/', function(req, res){
    res.redirect('/post/all');
});

router.use('/', authRoutes);
router.use('/post', postRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;




//post
// dashboard
// create new post
// update post

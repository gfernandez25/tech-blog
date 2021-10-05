const router = require('express').Router();
const authRoutes = require('./authentication-routes');
const postRoutes = require('./post-routes');

router.get('/', function(req, res){
    res.redirect('/post/all');
});
router.use('/', authRoutes);
router.use('/post', postRoutes);

module.exports = router;




//post
// dashboard
// create new post
// update post

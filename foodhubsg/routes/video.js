const express = require('express');
const router = express.Router();


router.get('/listVideos', (req, res) => {
    res.render('video/listVideos', { // pass object to listVideos.handlebar videos: 'List of videos'
        videos: 'List of videos',
        message: req.flash('message'),
        user: req.user,
    });
});


module.exports = router;
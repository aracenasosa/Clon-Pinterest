
// Global Variables
const { Router } = require('express');
const { unlink } = require('fs-extra');
const path = require('path');

// Initializations
const router = Router();

// Model of mongodb
const Image = require('../Models/Image');

//Index Page
router.get('/', async (req, res) => {
    const images = await Image.find();
    console.log(images);
    res.render('Index', {images});
});

//Upload Page
router.get('/upload', (req, res) => {
    res.render('Upload');
});

//Method Post for receive the data
router.post('/upload', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/Img/Uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    console.log(image);

    setTimeout(() => {
        res.redirect('/');
    }, 2500);
});

// Details Page
router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('Profile', {image});
});

// Delete Page
router.get('/image/:id/delete', async (req, res) => {

        const { id } = req.params;
        const image = await Image.findByIdAndDelete(id);
        await unlink(path.resolve('./Src/Public' + image.path));
        res.redirect('/');
    
});

// Export the router
module.exports = router;
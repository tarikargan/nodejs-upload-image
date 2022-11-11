const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer  = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    }
})
function fileFilter (req, file, cb) {
   if((file.mimetype).indexOf('image') > -1){
       cb(null, true)
   }else{
       cb(null, false)
       cb(new Error('I don\'t have a clue!'))
   }
}

  
const upload = multer({ storage: storage ,limits:{ fileSize: 1024 * 1024 * 5 }, fileFilter:fileFilter});
// get all categories 
router.get('/', (req, res, next) => {
    const categories = [];
    res.status(200).json({
        message: 'get all categories successfully',
        count: categories.length,
        category: categories,
        request : {
            method: "GET",
            url:'https://fakestoreapi.com/products/categories'
        }
    });

})

// get category
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'hello tarik'
    })
})

//  post category
router.post('/', upload.single('uploaded_file'), (req, res, next) => {
    const category = {
        _id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        CategoryIcons: req.file.filename
    };
    console.log(req.file, req.body)
    res.status(200).json({
        message: 'create category successfully',
        category: category,
        request : {
            method: "POST",
            url:'http://localhost:5000/api/category/'+ category._id
        }
    })
    
})

// delete category
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    res.status(200).json({
        message: 'hello tarik'
    })
})

// delete category
router.patch('/:id', (req, res, next) => {
    let id = req.params.id;
    res.status(200).json({
        message: 'hello tarik'
    })
})

module.exports = router;
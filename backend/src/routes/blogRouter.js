const express = require('express')
const { createBlogController, getAllBlogsController, updateBlogController, deleteBlogController, uploadCoudinary, getBlogsById, getSingleBlogById } = require('../controllers/blogController')
const authanticateToken = require('../middlewares/auth')
const upload = require('../middlewares/multer')
const blog = express.Router()

blog.post('/create-blog',authanticateToken, upload.single('image'), createBlogController) // http://localhost:3000/api/v1/blog/create-blog

blog.post('/upload-image', upload.single('image'), uploadCoudinary ) // http://localhost:3000/api/v1/blog/upload-image

blog.get('/all-blogs',  getAllBlogsController) // http://localhost:3000/api/v1/blog/all-blogs

blog.get('/getsingleblog/:id', getSingleBlogById) // http://localhost:3000/api/v1/blog/getsingleblog/:id

blog.put('/update-blog/:id',authanticateToken, upload.single('image'), updateBlogController) // http://localhost:3000/api/v1/blog/update-blog

blog.delete('/delete-blog/:id',authanticateToken, deleteBlogController) // http://localhost:3000/api/v1/blog/delete-blog

blog.get('/get-blog', authanticateToken, getBlogsById) // http://localhost:3000/api/v1/blog/get-blog

module.exports = blog
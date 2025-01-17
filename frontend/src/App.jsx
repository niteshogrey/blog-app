import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Blogs from './pages/Blogs'
import Register from './pages/Register'
import Login from './pages/Login'
import MyBlogs from './pages/MyBlogs'
import CreateBlog from './pages/CreateBlog'
import UpdateBlog from './pages/UpdateBlog'
import BlogDetails from './pages/BlogDetails'
// import { useSelector } from 'react-redux'

function App() {
  // const isLogin = useSelector((state)=>state.auth.isLogin)

  return (
    <>
    <Navbar/>      
      <Routes>
        <Route path='/' element={<Blogs/>}/>
        <Route path='/myblogs' element={<MyBlogs/>}/>
        <Route path='/createblog' element={<CreateBlog/>}/>
        <Route path='/blogdetails/:id' element={<BlogDetails/>}/>
        <Route path='/blogdetailsandedit/:id' element={<UpdateBlog/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App

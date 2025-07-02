const path=require("path");
const express=require("express");
const cookieparser=require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const app=express();
const PORT=process.env.PORT||8000;
// const conn=process.env.MONGO_URL||'mongodb://127.0.0.1:27017/blogify';

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blogify')
.then((e)=> console.log("MongoDB Connected"))

const Blog = require('./models/blog')

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

  

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(cookieparser());
 app.use(checkForAuthenticationCookie("token")) 
app.use(express.urlencoded({extended:false}))

    


   app.use(express.static(path.resolve('./public')))

app.get('/',async(req,res)=>{
   console.log("working");
    const allBlogs = await Blog.find({});
    return res.render('home',{
        user: req.user,
        blogs: allBlogs
    });
})

   app.use('/user',userRoute) 
app.use('/blog',blogRoute)
 
   app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
 
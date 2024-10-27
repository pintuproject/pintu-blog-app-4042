import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from "axios" 
const Blog = () => {

const[blog,setBlog]=useState([])
 
useEffect(()=>{
  const fetchBlogs=async()=>{
    try{
    const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blog/blogs`)
    setBlog(response.data)
    }
    catch(error){
      console.log(error)
    }
  }
  fetchBlogs();
},[])
 
 
  return (
    <>
    <ul>
      {blog.map(item=> (
      <li key={item._id}>
     <div className='card-item'>
     <div className="block justify-center  max-w-xxlg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
style={{height:'300px',width:'700px'}}>
   
   <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="Author"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{item.author}</h2>
            <p className="text-sm text-gray-600">Published on {new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        
  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
     {item.title}
  </h5>
  <p className="font-normal text-gray-700 dark:text-gray-400">
     {item.content.slice(0,200)}...
  </p>
  <div className="mt-4 flex items-center space-x-6">
            <p className="flex items-center space-x-1 text-gray-600">
              <span role="img" aria-label="likes">👍</span>
              <span>{item.likes ? item.likes.length : 0} Likes</span>
            </p>
            <p className="flex items-center space-x-1 text-gray-600">
              <span role="img" aria-label="comments">💬</span>
              <span>{item.comments ? item.comments.length : 0} Comments</span>
            </p>
          </div>
  
  <a
            href={`/blog-detail/${item._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Read more
          </a>
</div>
</div>
</li>
      ))}
</ul>
  </>
  )
}

export default Blog
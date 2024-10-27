import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const BlogEditor = () => {
  const[blogData,setBlogData]=useState({title:'',content:''})
  const navigate=useNavigate()

const token=localStorage.getItem('token')
  const handleInputChange=(e)=>{
    const{name,value}=e.target
    setBlogData({...blogData,[name]:value})
  }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/blog/blogs`,  blogData, {
          headers: { Authorization: `Bearer ${token}` },
      });
       navigate('/home')
      }
      catch(error){
        console.log(error)
      }
     

        
    }
  return (
       

      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create a Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
           
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Blog Title
            </label>
            <textarea
              id="title"
              name="title"
              rows={3}
              onChange={handleInputChange}
              value={blogData.title}
              className="block w-full px-4 py-3 text-gray-800 bg-gray-50 rounded-md border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a captivating title..."
            />
          </div>
          
         
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Blog Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              onChange={handleInputChange}
              value={blogData.content}
              className="block w-full px-4 py-3 text-gray-800 bg-gray-50 rounded-md border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Share your thoughts here..."
            />
          </div>
    
           
          <div>
            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-150"
            >
              Publish Post
            </button>
          </div>
    
        </form>
      </div>
    </div>
    
             
  )
}

export default BlogEditor
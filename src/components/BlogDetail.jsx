import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import '../App.css'
import { useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  const [data,setData]=useState({})
  const{id}=useParams();
  const[comment,setComment]=useState('')
  const[commentData,setCommentData]=useState([])
   const navigate=useNavigate()
  

  const getUserData=()=>{
const token=localStorage.getItem('token')
console.log('token',token)
try{
  const decodeToken= jwtDecode(token)
  console.log('decode token is',decodeToken)
  const userId=decodeToken.id
  console.log('user id',userId)
  return userId;
}catch(error){

}

  }
  useEffect(()=>{
    const fetchData=async()=>{
      const response= await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blog/blogs/${id}`)
      setData(response.data)

    }
    const fetchCommentData=async()=>{
      try{
      
       const response= await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blog/blogs/${id}/comments`)
       setCommentData(response.data)
        console.log(commentData)
      }catch(error){
        console.log(error)
      }

    }
    fetchData()
    fetchCommentData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])
  const handleLike = async() => {
    const userId= await  getUserData();
  if(!userId)
    {
    navigate('/login')
    return 
    }

    try{
     await axios.post(`${process.env.REACT_APP_BASE_URL}/api/blog/blogs/${id}/likes`,{userId})
    //  setData(prevData=>({...prevData,likes:prevData.likes.push(userId)}))
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blog/blogs/${id}`)
    setData(res.data)
    
    }catch(error){
      console.log(error)
    }
    
  };

   
  const handleCommentSubmit=async(e)=>{
    e.preventDefault()
    const userId=await getUserData()
    if(!userId){
      navigate('/login')
    }
    const userComment={
      user: userId ,
      text:comment
    }
     
    try{
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/blog/blogs/${id}/comments`,userComment)
    setComment('')
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/blog/blogs/${id}/comments`)
    setCommentData(res.data)
    }catch(error){
      console.log(error)
    }
    

  }
  console.log(commentData)
  console.log(data)
   
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        {/* Author Section */}
        <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="Author"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{data.author}</h2>
            <p className="text-sm text-gray-600">Published on {new Date(data.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">{data.title}</h1>

        {/* Blog Content */}
        <div className="mt-4 text-gray-700 leading-relaxed">
          <p>
            {data.content}
          </p>
        </div>
        <div className="mt-6 flex space-x-4 y-4">
          <button
            onClick={handleLike}
            className="px-4 py-2  bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition-colors duration-300"
          >
            Like 
          </button>
           <p className='mt-2 ml-1'>{data?.likes?.length}</p>
        </div>
<section className="w-full border-none p-2 my-2 mx-0 max-w-xl">
  <h3 className="font-os text-lg font-bold">Comments</h3>
  {Array.isArray(commentData) && commentData.length > 0 ? (
    commentData.map((comment) => (
      <div className="flex mt-4" key={comment._doc._id}>
        <div className="w-14 h-14 rounded-full bg-purple-400/50 flex-shrink-0 flex items-center justify-center">
          {/* Add avatar or initials here if needed */}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex justify-between items-center">
            <div className="font-medium text-purple-800">{comment.name}</div>
            <div className="text-gray-600 text-sm whitespace-nowrap">
              Posted on {new Date(comment._doc.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="mt-2 text-purple-800">{comment._doc.text}</div>
        </div>
      </div>
    ))
  ) : (
    <p>No comments yet</p>
  )}
   
    {/* Comment Form */}
    <form onSubmit={handleCommentSubmit}className="mt-4">
      <div className="mb-4">
        <label htmlFor="comment" className="block text-purple-800 font-medium">
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          className="border-2 border-purple-600 p-2 w-full rounded"
          required=""
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
           
        />
      </div>
      <button
        type="submit"
        className="bg-purple-700 text-white font-medium py-2 px-4 rounded hover:bg-purple-600"
      >
        Post Comment
      </button>
    </form>
     
  </section>
  </div>   
  </div>
</>


     
  );
};

export default BlogDetail;

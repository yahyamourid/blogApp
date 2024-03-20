import React from 'react'
import PostDetail from '../components/PostDetail'
import Header from '../components/Header'
const Posts = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Header/>
      <PostDetail/>
    </div>
  )
}

export default Posts

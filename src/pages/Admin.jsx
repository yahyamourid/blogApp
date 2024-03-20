import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import SideBar from '../components/SideBar'
import ManageCategories from '../components/ManageCategories'
import AddArticle from '../components/AddPost'
const Admin = (content) => {
  const [showPosts, setShoPsts] = useState(true)
  if (content == 'categories')
    setShoPsts(false)
  return (
    <div className='flex max-h-screen min-h-screen '>
      <SideBar />
      {showPosts ?
        <AddArticle />
        :
        <ManageCategories />}

    </div>
  )
}

export default Admin

import React, { useState , useEffect} from 'react'
import SideBar from '../components/SideBar'
import ManagePosts from '../components/ManagedPosts'
import ManageCategories from '../components/ManageCategories'
import AddArticle from '../components/AddPost'
const Admin = (props) => {
  const [showPosts, setShowPosts] = useState(true)
  useEffect(() => {
    if (props.content === 'categories') {
      setShowPosts(false);
    }
  }, []);
  return (
    <div className='flex max-h-screen min-h-screen  w-full'>
      <div className='w-1/12'>
        
      <SideBar />
      </div>
      {showPosts ?
        <div className='w-11/12'>
        
        <ManagePosts />
        </div>
        :
        <ManageCategories />}

    </div>
  )
}

export default Admin

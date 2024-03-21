import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan , faAdd } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddArticle from './AddPost';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const apiUrl = "http://localhost:5056/api/articles";
  const [add, setAdd] = useState(false)

  const fetchPosts = async () => {
    try {
      const response = await axios.get(apiUrl);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5056/api/category');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories()
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const addPosts = async () => {

  };



  const deletePost = async (postId) => {
    try {
      await axios.delete(`${apiUrl}/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };



  return (
    <div className="flex w-full justify-center py-12  ">
      {!add ? 
      <div className="relative flex flex-col items-center w-full rounded-lg ">
      <button className='absolute top-2 right-32 text-white bg-black px-3 py-1 rounded-lg ' onClick={() => setAdd(true)}>
        <FontAwesomeIcon icon={faAdd} className='mr-2'/>Ajouter
      </button>
      <h2 className="text-3xl font-semibold mb-12">Gestion des Articles</h2>

      <div className="grid grid-cols-3 w-4/5 gap-8 ">
        {posts.map((post, index) => (

          <div key={post.id} className=" relative group flex flex-col items-center w-full border border-opacity-40 shadow-md border-gray-600 rounded-lg hover:scale-105 duration-150">
            <div className='w-full flex items-center '>
              <a href={`/posts/${post.id}`} className='w-full'>
                <img
                  src={`https://gateway.pinata.cloud/ipfs/${post.url}`}
                  alt={`Post ${post.id}`}
                  className="w-full h-40 rounded-t-lg"
                />
              </a>
            </div>
            <div className='flex flex-col w-5/6 gap-4 p-2'>
              <h3 className={`text-sm font-bold tracking-wide text-black`}>{post.title}</h3>
              <span className='flex gap-4 items-center justify-between'>
                <span className='flex gap-2'>
                  <p className={`text-xs text-gray-600 font-medium`}>{formatDate(post.createdAt)}</p>
                  <span className={`text-xs font-semibold text-gray-600`}><a href={`/categories/${post.categoryId}`}> {getCategoryName(post.categoryId)}</a></span>
                </span>
                <button className='absolute right-3 bottom-1' onClick={() => deletePost(post.id)}>
                  <FontAwesomeIcon className="text-gray-400 text-opacity-20  group-hover:text-red-600 hover:scale-105" icon={faTrashCan} />
                </button>
              </span>
            </div>
          </div>

        ))}
      </div>
    </div>
:<AddArticle cancel={() => {setAdd(false) ,fetchPosts()}}/>

      }
          </div>
  );
};

export default ManagePosts;

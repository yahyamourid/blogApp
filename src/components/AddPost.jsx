import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const AddArticle = (props) => {
  const [creating, setcreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
    image: null,
    CreatedAt: new Date().toLocaleDateString()
  });  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5056/api/category');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content: content });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setcreating(true)
      const imageData = new FormData();
      imageData.append('file', formData.image);

      const imageResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', imageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'pinata_api_key': '164e655c9427dfb4e6e7',
          'pinata_secret_api_key': '50505a895970e25d38064f9210634bf93c73ceb4fde76bc0391cfa77279b4263'
        }
      });

      const imageUrl = imageResponse.data.IpfsHash;

      const articleData = {
        title: formData.title,
        content: formData.content,
        categoryId: formData.categoryId,
        url: `${imageUrl}`
      };
      console.log(articleData)
      await axios.post('http://localhost:5056/api/articles', articleData);

      alert('Article added successfully!');
      setFormData({
        title: '',
        content: '',
        categoryId: '',
        image: null
      });
      setcreating(false)
      props.cancel()
    } catch (error) {
      console.error("Error adding article:", error);
      alert('Failed to add article.');
      setcreating(false)
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-3/5 mx-auto ">
      <button className='text-black font font-semibold absolute top-3 left-3 hover:scale-110'
      onClick={() => props.cancel()}>
        <FontAwesomeIcon icon={faArrowLeft}/>
      </button>
      <h2 className="text-2xl font-semibold mb-4 mx-auto">Ajouter un Article</h2>
      <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center'>
        <div className="flex w-full gap-4 items-center justify-between">
          <div className="mb-4 w-2/5">
            <label htmlFor="title" className="block text-gray-700">Titre</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border border-gray-300 rounded-md py-1 px-3 w-full" required />
          </div>
          <div className="mb-4 w-1/5">
            <label htmlFor="categoryId" className="block text-gray-700">Categorie</label>
            <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} className="border border-gray-300 rounded-md py-1 px-3 w-full" required>
              <option value="">Categorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-2/5">
            <label htmlFor="image" className="block text-gray-700">Image</label>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="border border-gray-300 rounded-md py-1 px-3 w-full" required />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">Contenu</label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            className=" rounded-md"
          />
        </div>

        <button type="submit" disabled={creating} className='w-1/5 mx-auto'>
          {!creating ?
            <p className="bg-black hover:bg-gray-800 text-white py-1 px-4 rounded-md mx-auto">Ajouter</p> :
            <ClipLoader className="bg-bla text-white py-1 px-4 rounded-md mx-auto"/>
          }
        </button>

      </form>
    </div >
  );
};

export default AddArticle;

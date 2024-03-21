import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const apiUrl = "http://localhost:5056/api/category";

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (newCategory.trim() !== '') {
      try {
        await axios.post(apiUrl, { name: newCategory.trim() });
        fetchCategories();
        setNewCategory('');
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const editCategory = async () => {
    if (selectedCategory !== null && newCategory.trim() !== '') {
      try {
        await axios.put(`${apiUrl}/${selectedCategory}`, { 
          id: selectedCategory,
          name: newCategory.trim()
        });
        fetchCategories();
        setNewCategory('');
        setSelectedCategory(null);
      } catch (error) {
        console.error("Error editing category:", error);
      }
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${apiUrl}/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = (id,name) => {
    setSelectedCategory(id);
    setNewCategory(name);
  };

  return (
    <div className="flex w-full justify-center py-12">
      <div className="flex flex-col items-center w-3/5 rounded-lg ">
        <h2 className="text-3xl font-semibold mb-12">Gestion des Catégories</h2>
        <div className="mb-4 w-3/5  flex justify-between items-center">
          <input
            type="text"
            placeholder="Nouvelle Catégorie"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border border-gray-300 rounded-md py-1 px-3 mr-2 w-3/4"
          />
          <button
            onClick={selectedCategory !== null ? editCategory : addCategory}
            className="bg-black text-white py-1 px-4 rounded-xl w-1/4"
          >
            {selectedCategory !== null ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
        <ul className="space-y-3 w-3/5 ">
          {categories.map((category, index) => (
            <li key={index} className="flex items-center justify-between px-4 hover:bg-gray-100 rounded-lg py-1 shadow-sm border border-opacity-20 border-gray-600">
              <span className="mr-2 text-sm tracking-wide">{category.name}</span>
              <div>
                <button
                  onClick={() => handleEdit(category.id, category.name)}
                  className="text-blue-500 text-xs mr-2"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button onClick={() => deleteCategory(category.id)} className="text-red-500 text-xs">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCategories;

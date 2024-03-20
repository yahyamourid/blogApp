import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faFootballBall, faDesktop, faSchoolFlag, faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const Categories = () => {
  const categories = [
    { id:'3', name: 'News', icon: faNewspaper, color: 'bg-blue-500' },
    { id:'4', name: 'Sports', icon: faFootballBall, color: 'bg-green-500' },
    { id:'5', name: 'Coding', icon: faDesktop, color: 'bg-yellow-500' },
    { id:'6', name: 'Education', icon: faSchoolFlag, color: 'bg-purple-500' },
    { id:'8', name: 'Design', icon: faPencilSquare, color: 'bg-red-500' }
  ];

  const getCategories = async() => {
    try {
      const result = await axios.get("http://localhost:5056/api/category")
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  getCategories()
  return (
    <div className="grid grid-cols-5 gap-5 w-4/5 my-12">
      {categories.map((category, index) => (
        <a key={index} href={`/categories/${category.id}`} className={`flex items-center justify-center flex-col text-white p-4 rounded-lg ${category.color} hover:bg-gray-900`}>
          <FontAwesomeIcon icon={category.icon} size="2x" />
          <span className="mt-2 text-sm font-medium tracking-wide">{category.name}</span>
        </a>
      ))}
    </div>
  );
};

export default Categories;

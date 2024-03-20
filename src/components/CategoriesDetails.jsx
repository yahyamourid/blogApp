import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoriesDetails = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const postsPerPage = 5;
    const postRef = useRef(null);
    const { categoryId } = useParams();

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5056/api/articles');
            setPosts(response.data.filter(post => post.categoryId === parseInt(categoryId)));
            console.log(response.data)
            console.log(response.data.filter(post => post.categoryId === parseInt(categoryId)))
            console.log(categoryId)
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

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === parseInt(categoryId));
        return category ? category.name : '';
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        postRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const limitContent = (content) => {
        const cleanContent = content.replace(/<[^>]+>/g, '');
        const words = cleanContent.split(' ');
        const limitedContent = words.slice(0, 20).join(' ');
        if (words.length > 20) {
            return `${limitedContent} ...`;
        }
        return limitedContent;
    };

    return (
        <div className="w-4/5 pt-32 flex flex-col">
            {posts.length > 0 ? (
                <>
                    <span className={`text-2xl font-semibold mx-auto my-3`}>{getCategoryName(categoryId)}</span>
                    <span className='border my-2 w-1/3 mx-auto border-opacity-40 '></span>
                    <div ref={postRef} className='grid grid-cols-2 w-full'>
                        {currentPosts.map((post) => (
                            <div key={post.id} className="flex items-center w-full my-5">
                                <div className='w-3/5 flex items-center'>
                                    <img
                                        src={`https://gateway.pinata.cloud/ipfs/${post.url}`} 
                                        alt={`Post ${post.id}`}
                                        className="w-4/5 h-44"
                                    />
                                </div>
                                <div className='flex flex-col w-2/5 -ml-10 gap-4'>
                                    <h3 className={`text-sm font-bold tracking-wide text-black`}>{post.title}</h3>
                                    <p className={`text-xs text-gray-600`}>{limitContent(post.content)}</p>
                                    <span className='flex gap-4 items-center justify-between'>
                                        <p className={`text-xs text-gray-600 font-medium`}>{formatDate(post.createdAt)}</p>
                                        
                                        <a href={`/posts/${post.id}`}>
                                            <FontAwesomeIcon className="text-gray-600" icon={faArrowRight} />
                                        </a>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center gap-4'>
                        <button className=" text-black py-1 px-2" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <button className="bg-black text-white py-1 px-5" onClick={() => paginate(currentPage + 1)} disabled={indexOfLastPost >= posts.length}>
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p className='mx-auto text-xl font-medium -mt-20 '>Pas d'articles disponibles</p>
            )}
        </div>
    );
};

export default CategoriesDetails;

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const RecentPost = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const postsPerPage = 5;
    const postRef = useRef(null);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5056/api/articles');
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

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    };

    return (
        <div className="">
            <p className='text-xl font-semibold'>Articles les plus récents</p>
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
                                <span className={`text-xs font-semibold text-emerald-700`}><a href={`/categories/${post.categoryId}`}> {getCategoryName(post.categoryId)}</a></span>
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
                Précédent
                </button>
                <button className="bg-black text-white py-1 px-5" onClick={() => paginate(currentPage + 1)} disabled={indexOfLastPost >= posts.length}>
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default RecentPost;

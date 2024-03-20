import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RecentPost from './RecentPost';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState([]);
    const [plus, setPlus] = useState(false)

    useEffect(() => {
        fetchPost();
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
    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:5056/api/articles/${postId}`);
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    if (!post) {
        return <div>Chargement en cours...</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    };

    const formatContent = (content) => {
        const formattedContent = content
            .replace(/<h1/g, '<div class="text-3xl font-bold mb-2"')
            .replace(/<\/h1>/g, '</div>')
            .replace(/<h3/g, '<div class="text-lg font-bold "')
            .replace(/<\/h3>/g, '</div>');
        return formattedContent;
    };

    return (
        <div className="flex flex-col justify-center pt-28 pb-20 w-4/5">

            <img src={`https://gateway.pinata.cloud/ipfs/${post.url}`} alt={`Post ${post.id}`} className="mb-4 w-3/5 mx-auto" />
            <p className="mb-2 text-sm text-gray-600">Catégorie : <span className='text-red-500'>{getCategoryName(post.categoryId)}</span></p>
            <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
            <p className="mt-4 text-sm text-gray-500">Date de création : {formatDate(post.createdAt)}</p>
            {!plus ?
                <button className='mx-auto text-black font-medium hover:text-gray-800 hover:underline' onClick={() => setPlus(true)}>voir plus</button>
                : <>
                    <span className='border my-12'></span>
                    <RecentPost />
                </>
            }
        </div>
    );
};

export default PostDetail;

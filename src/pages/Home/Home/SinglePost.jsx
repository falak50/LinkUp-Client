import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';

export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`http://localhost:5000/posts/post/${id}`)
            .then((response) => {
                const fetchedProduct = response.data[0];
                if (fetchedProduct) {
                    setPost(fetchedProduct);
                    setErrorMessage('');
                } else {
                    setErrorMessage('This post was deleted or does not exist.');
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
                setErrorMessage('An error occurred while fetching the post.');
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>{errorMessage}</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-full lg:w-[55%]">
                <Post post={post} />
            </div>
        </div>
    );
}

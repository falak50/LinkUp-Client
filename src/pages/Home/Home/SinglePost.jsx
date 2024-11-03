import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from './Post';

export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        axios
          .get(`http://localhost:5000/posts/post/${id}`)
          .then((response) => {
            const fetchedProduct = response.data[0];
            setPost(fetchedProduct);

            setIsLoading(false);
           
          })
          .catch((error) => {
            console.error('Error fetching product:', error);
            setIsLoading(false);
          });
      }, []);

      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Spin size="large" />
          </div>
        );
      }
      console.log('post',post)

  return (
    <div className="flex justify-center  min-h-screen">
    <div className="w-full lg:w-[55%]">
      {/* <p>{id}</p> */}
      {/* <post post={post}></post> */}
      <Post post={post}></Post>
    </div>
    </div>
  )
}

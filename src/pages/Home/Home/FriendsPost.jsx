import { useEffect, useState } from 'react';
import Posts from './Posts';
import axios from 'axios';
import { Button, Spin } from 'antd';

export default function FriendsPost({ resetCount, setResetCount }) {
  const [posts, setPosts] = useState([]);
  const owner = JSON.parse(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/posts/friendsPost/${owner._id}`, {
        params: { page: page }, // Pass the page number in the query parameters
      })
      .then((response) => {
        if (page === 1) {
          setPosts(response.data);  // Replace posts on the first load or reset
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);  // Append posts for subsequent loads
        }
        setIsLoading(false);
        setIsMoreLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
        setIsMoreLoading(false);
      });
  }, [resetCount, page]);

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Posts posts={posts} setResetCount={setResetCount} />
      <div className="flex justify-center my-6">
        <Button
          onClick={() => {
            setIsMoreLoading(true);
            setPage((p) => p + 1);
          }}
          type="primary"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          size="large"
          loading={isMoreLoading}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}

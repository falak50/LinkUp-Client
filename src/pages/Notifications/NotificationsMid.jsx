import { Divider, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import axios from "axios";
import { LikeOutlined, CommentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function NotificationsMid() {
  const { curUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/check/owner/${curUser?._id}`)
      .then((response) => {
        const fetchedNotifications = response.data.notifications;
        setNotifications(fetchedNotifications);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        setIsLoading(false);
      });
  }, [curUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const handleNotificationClick = (postId) => {
    // Navigate to the specific post
    navigate(`/post/${postId}`);
  };

  return (
    <div className="p-5 font-sans bg-gray-50 rounded-lg shadow-md mt-0"> {/* Adjusted margin-top to 0 */}
      {notifications.map((notification) => {
        let message;
        let icon;
        let postId; // Extract the post ID from the notification

        if (notification.action === "like") {
          message = `${notification.senderName} liked your post.`;
          icon = <LikeOutlined className="text-blue-500" />;
          postId = notification.postId; // Assuming postId is part of the notification
        } else if (notification.action === "comment") {
          message = `${notification.senderName} commented on your post.`;
          icon = <CommentOutlined className="text-green-500" />;
          postId = notification.postId; // Assuming postId is part of the notification
        }

        return (
          <div
            key={notification._id}
            className="flex items-start bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow mb-2 cursor-pointer" // Added cursor-pointer
            onClick={() => handleNotificationClick(postId)} // Add click handler
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(notification.senderName)}&background=random&color=fff`}
              alt={`${notification.senderName} avatar`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="flex items-center mb-1">
                {icon}
                <p className="font-bold ml-2">{notification.senderName}</p>
              </div>
              <p className="text-gray-700">{message}</p>
              <p className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

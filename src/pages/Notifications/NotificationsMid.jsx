import { Divider } from "antd";

export default function NotificationsMid() {
  const notifications = [
    {
      type: "post",
      user: "Mehraz Hossain Rumman",
      message: "Software engineering isn’t only about writing lines of code—it’s about becoming a reliable team player. You may be new to coding or still learning, and that’s okay...",
      time: "17m",
    },
    {
      type: "suggestion",
      user: "Suggested for you",
      message: "This week on The Audit Podcast, we're joined by Stephanie Richard, Chief Audit Executive at Ally. In this episode, Stephanie shares how she transformed the culture and mindset of...",
      time: "1h",
    },
    {
      type: "search",
      user: "LinkedIn",
      message: "You appeared in 17 searches this week.",
      time: "2h",
    },
    {
      type: "job",
      user: "Developer",
      message: "7 opportunities in Dhaka",
      time: "4h",
    },
    {
      type: "profileView",
      user: "Fabiha Sanjeda",
      message: "viewed your profile. See all views.",
      time: "7h",
    },
    {
      type: "job",
      user: "Software Engineer",
      message: "13 opportunities in Sylhet, Bangladesh",
      time: "7h",
    },
  ];

  return (
    <div className="p-5 font-sans">
      {notifications.map((notification, index) => (
       <>
       <div
          key={index}
          className="flex items-center bg-blue-50 p-4 rounded "
        >
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(notification.user)}&background=random&color=fff`}
            alt={`${notification.user} avatar`}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="font-bold">{notification.user}</p>
            <p>{notification.message}</p>
            <p className="text-xs text-gray-500">{notification.time}</p>
          </div>
          
         
        </div> 

       </>
      ))}
    </div>
  );
}

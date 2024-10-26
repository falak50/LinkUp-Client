
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
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {/* <h2 className="text-2xl font-serif bg-white pd">Notifications</h2> */}
        {/* <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button>All</button>
          <button>Jobs</button>
          <button>My posts</button>
          <button>Mentions</button>
        </div> */}
        {/* <img src={} alt="Notification Panel" style={{ width: '100%', marginBottom: '20px' }} /> */}
        {notifications.map((notification, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#e8f4fb',
              padding: '15px',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(notification.user)}&background=random&color=fff`}
              alt={`${notification.user} avatar`}
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
            />
            <div>
              <p style={{ fontWeight: 'bold' }}>{notification.user}</p>
              <p>{notification.message}</p>
              <p style={{ fontSize: '12px', color: 'gray' }}>{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
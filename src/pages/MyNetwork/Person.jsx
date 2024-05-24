<div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
    <div className="relative h-48">
        {/* Background Image */}
        <img src="background-picture-url.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover rounded-t-xl" />
        
        {/* Profile Picture */}
        <img src="profile-picture-url.jpg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-4" />
    </div>
    <div className="card-body items-center text-center">
        {/* User Name */}
        <h2 className="card-title text-xl text-white font-bold">User Name</h2>
        
        {/* User Title */}
        <p className="text-white">User Title</p>
        
        {/* Action Buttons */}
        <div className="card-actions mt-4">
            <button className="btn btn-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Edit Profile</button>
            <button className="btn btn-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Message</button>
        </div>
    </div>
</div>

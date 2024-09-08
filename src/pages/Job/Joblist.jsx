import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaTimes } from 'react-icons/fa';
import JobSearch from './JobSearch';
import axios from 'axios'; // Import axios

export default function Joblist() {
    const [list, setList] = useState([
        {
            "_id": "66dc7b370f6ce4bfc63ecb93",
            "title": "Developer",
            "location": "Dhaka",
            "description": "Develop and maintain web applications.",
            "workType": "Remote",
            "uid": "65906b9f80ab38cb50b0078f",
            "createdAt": "2024-09-07T16:11:35.748Z",
            "userInfo": {
                "email": "m10@gmail.com",
                "first_name": "Mahdi",
                "last_name": "Ahmed",
                "ProfileImgURL": "https://via.placeholder.com/150"
            }
        },
        {
            "_id": "66dc76fb415b196f362fe5b6",
            "title": "Software Engineer",
            "location": "New York",
            "description": "Develop software solutions.",
            "workType": "On-site",
            "uid": "65906b9f80ab38cb50b0078f",
            "createdAt": "2024-09-07T15:53:31.121Z",
            "userInfo": {
                "email": "m10@gmail.com",
                "first_name": "Mahdi",
                "last_name": "Ahmed",
                "ProfileImgURL": "https://via.placeholder.com/150"
            }
        }
    ]);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jobs');
                console.log(response.data); // Handle or display the data as needed
                setList(response.data); // Assuming the API response has the job data
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        handleSearch(); // Trigger the search once on component mount
    }, []); // Empty dependency array ensures this runs only on mount

    const [selectedJob, setSelectedJob] = useState(list[0]);

    const removeJob = (id) => {
        const updatedList = list.filter(job => job._id !== id);
        setList(updatedList);

        // Auto-select the first job or set to null if the list is empty
        if (updatedList.length > 0) {
            setSelectedJob(updatedList[0]);
        } else {
            setSelectedJob(null);
        }
    };

    return (
        <>
            <JobSearch />
            <div className="container mx-auto p-4 h-screen flex">
                {/* Left side: Job list */}
                <div className="w-1/2 bg-white overflow-y-auto border-r px-4 py-2">
                    <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
                    <ul className="divide-y divide-gray-300">
                        {list.map(job => (
                            <li
                                key={job._id}
                                className={`relative py-4 px-4 mb-2 cursor-pointer hover:bg-gray-100 ${selectedJob && selectedJob._id === job._id ? 'bg-gray-100' : ''}`}
                                onClick={() => setSelectedJob(job)} // Set the selected job when clicked
                            >
                                <button
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click event from triggering the job selection
                                        removeJob(job._id);
                                    }}
                                    aria-label="Remove job"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={job.userInfo.ProfileImgURL}
                                        alt={`${job.userInfo.first_name}'s profile`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{job.title}</h3>
                                        <p className="text-gray-500 flex items-center">
                                            <FaMapMarkerAlt className="mr-2" /> {job.location}
                                        </p>
                                        <p className="text-gray-500 flex items-center">
                                            <FaBriefcase className="mr-2" /> {job.workType}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">Posted by: {job.userInfo.first_name} {job.userInfo.last_name}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right side: Job details */}
                <div className="w-1/2 bg-white p-6 px-4 py-2">
                    {selectedJob ? (
                        <>
                            <h2 className="text-4xl font-bold mb-4">{selectedJob.title}</h2>
                            <div className="flex items-center mb-2">
                                <FaMapMarkerAlt className="text-lg mr-2" />
                                <p className="text-lg"><strong>Location:</strong> {selectedJob.location}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaBriefcase className="text-lg mr-2" />
                                <p className="text-lg"><strong>Work Type:</strong> {selectedJob.workType}</p>
                            </div>
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={selectedJob.userInfo.ProfileImgURL}
                                    alt={`${selectedJob.userInfo.first_name}'s profile`}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <p className="text-md"><strong>Posted by:</strong> {selectedJob.userInfo.first_name} {selectedJob.userInfo.last_name}</p>
                                    <p className="text-md"><strong>Email:</strong> {selectedJob.userInfo.email}</p>
                                    <p className="text-md"><strong>Posted on:</strong> {new Date(selectedJob.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className="text-lg mb-4" style={{ whiteSpace: 'pre-line' }}>
    <strong>About the job:</strong> {selectedJob.description}
</p>
                        </>
                    ) : (
                        <p className="text-lg">Please select a job to see the details.</p>
                    )}
                </div>
            </div>
        </>
    );
}

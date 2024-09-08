import React, { useState } from 'react';
import axios from 'axios';
import Job from './Job';

export default function JobSearch() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [workType, setWorkType] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jobs', {
        params: {
          title,
          location,
          workType,
          page: 1, // Default to the first page
          limit: 5 // Default to 5 items per page
        }
      });
      console.log(response.data); // Handle or display the data as needed
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md mx-4 mt-2 ">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-gray-800 text-2xl font-semibold">Job Search</h1>
        <div className="flex flex-1 items-center space-x-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-sm text-sm w-full max-w-xs"
            placeholder="Job Title"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded-sm text-sm w-full max-w-xs"
            placeholder="Location"
          />
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="p-2 border border-gray-300 rounded-sm text-sm w-full max-w-xs"
          >
            <option value="">Any</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-sm text-sm"
          >
            Search
          </button>
          <Job></Job>
        </div>
      </div>
    </div>
  );
}

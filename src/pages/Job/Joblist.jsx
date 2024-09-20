import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import JobSearch from "./JobSearch";
import axios from "axios";
import { Radio, Space } from "antd";
import EditJob from "./EditJob";

export default function Joblist() {
  const [list, setList] = useState([]); // Ensure list is always an array
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [reset,setReset] = useState(0);
  const limit = 5;
  const owner = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs", {
          params: {
            title,
            location,
            workType,
            page: curPage,
            limit: limit,
          },
        });
        const jobs = response.data || [];
        setList(jobs);
        if (jobs.length > 0) {
          setSelectedJob(jobs[0]);
        } else {
          setSelectedJob(null);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [curPage,reset]);

  const handleSearch = async () => {
    setCurPage(1);
    try {
      const response = await axios.get("http://localhost:5000/jobs", {
        params: {
          title,
          location,
          workType,
          page: curPage,
          limit: 5,
        },
      });
      const jobs = response.data || [];
      console.log('response',response)
      setList(jobs);
      if (jobs.length > 0) {
        setSelectedJob(jobs[0]);
      } else {
        setSelectedJob(null);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="w-full rounded-lg">
      <JobSearch
        handleSearch={handleSearch}
        title={title}
        setTitle={setTitle}
        location={location}
        setLocation={setLocation}
        workType={workType}
        setWorkType={setWorkType}
        setList={setList}
      />
      <div className="container mx-auto p-2 h-screen flex rounded-lg">
        {/* Left side: Job list with scrolling */}
        <div className="w-1/2 bg-white h-full overflow-y-auto border-r px-4 py-2">
          <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
          <ul className="divide-y divide-gray-300">
            {Array.isArray(list) && list.length > 0 ? (
              list.map((job) => (
                <li
                  key={job._id}
                  className={`relative py-4 px-4 mb-2 cursor-pointer hover:bg-gray-100 ${
                    selectedJob && selectedJob._id === job._id
                      ? "bg-gray-100"
                      : ""
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  {job.uid === owner._id && (
                    <div className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                      <EditJob
                        job={job}
                        setList={setList}
                        setSelectedJob={setSelectedJob}
                        setReset={setReset}
                      />
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000/images/${job.userInfo.ProfileImgURL}`}
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
                      <p className="text-sm text-gray-500 mt-2">
                        Posted by: {job.userInfo.first_name}{" "}
                        {job.userInfo.last_name}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-lg">No jobs available.</p>
            )}
          </ul>
          <Space className="flex justify-center items-center mt-4">
            <Radio.Group>
              <Radio.Button
                onClick={() => setCurPage(curPage - 1)}
                disabled={curPage <= 1}
              >
                Previous
              </Radio.Button>
              <Radio.Button
                onClick={() => setCurPage(curPage + 1)}
                disabled={list.length < limit}
              >
                Next
              </Radio.Button>
            </Radio.Group>
          </Space>
        </div>

        {/* Right side: Job details with scrolling */}
        <div className="w-1/2 bg-white h-full overflow-y-auto p-6 px-4 py-2">
          {selectedJob ? (
            <>
              <h2 className="text-4xl font-bold mb-4">{selectedJob.title}</h2>
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-lg mr-2" />
                <p className="text-lg">
                  <strong>Location:</strong> {selectedJob.location}
                </p>
              </div>
              <div className="flex items-center mb-2">
                <FaBriefcase className="text-lg mr-2" />
                <p className="text-lg">
                  <strong>Work Type:</strong> {selectedJob.workType}
                </p>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={`http://localhost:5000/images/${selectedJob.userInfo.ProfileImgURL}`}
                  alt={`${selectedJob.userInfo.first_name}'s profile`}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="text-md">
                    <strong>Posted by:</strong>{" "}
                    {selectedJob.userInfo.first_name}{" "}
                    {selectedJob.userInfo.last_name}
                  </p>
                  <p className="text-md">
                    <strong>Email:</strong> {selectedJob.userInfo.email}
                  </p>
                  <p className="text-md">
                    <strong>Posted on:</strong>{" "}
                    {new Date(selectedJob.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="my-3">
                <div
                  className="btn btn-sm  rounded-full btn-outline hover:bg-opacity-20 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-[#0a66c2] btn-ghost flex items-center justify-center py-1 px-3 w-[110px]"
                >
                  <a
                    href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${
                      selectedJob.userInfo.email
                    }&su=Apply%20for%20the%20post%20${encodeURIComponent(
                      selectedJob.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full text-center flex items-center justify-center font-semibold"
                  >
                    EASY Apply
                  </a>
                </div>
              </div>
              <p className="text-lg mb-4" style={{ whiteSpace: "pre-line" }}>
                <strong>About the job:</strong> {selectedJob.description}
              </p>
            </>
          ) : (
            <p className="text-lg">Please select a job to see the details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

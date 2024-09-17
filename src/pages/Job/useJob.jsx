import { useState, useEffect } from "react";
import axios from "axios";

const useJob = (initialSearchParams = {}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/jobs", {
          params: searchParams,
        });
        setJobs(response.data);
        setCurrentIndex(0); // Reset to the first job
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  const searchJobs = (newParams) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const removeJob = (id) => {
    const updatedList = jobs.filter((job) => job._id !== id);
    setJobs(updatedList);

    if (currentIndex >= updatedList.length) {
      setCurrentIndex(updatedList.length - 1);
    }
  };

  const nextJob = () => {
    if (currentIndex < jobs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousJob = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const selectedJob = jobs[currentIndex] || null;

  return {
    jobs,
    selectedJob,
    currentIndex,
    loading,
    error,
    searchJobs,
    removeJob,
    nextJob,
    previousJob,
  };
};

export default useJob;

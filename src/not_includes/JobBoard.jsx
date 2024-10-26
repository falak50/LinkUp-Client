import JobList from "../pages/Job/JobList";
import SearchJob from "../pages/Job/JobSearch";
import useJob from "../pages/Job/useJob";

export default function JobBoard() {
  const {
    jobs,
    selectedJob,
    nextJob,
    previousJob,
    removeJob,
    searchJobs,
    setCurrentIndex,
    currentIndex,
    // loading,
    // error,
  } = useJob();


  return (
    <div className="w-full rounded-lg">
      {/* <h1>dsadasd</h1> */}
      {/* Search Component */}
      <SearchJob onSearch={searchJobs} />

      {/* Job List Component */}
      <JobList
        jobs={jobs}
        selectedJob={selectedJob}
        nextJob={nextJob}
        previousJob={previousJob}
        removeJob={removeJob}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />
    </div>
  );
}

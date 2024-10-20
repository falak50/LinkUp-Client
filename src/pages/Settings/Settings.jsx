import { useContext, useState } from "react";
import { Switch, Button, Select, Input, Modal } from "antd";
import axios from "axios";

const initialJobOptions = [
  "Software Developer",
  "Data Scientist",
  "Data Analyst",
  "Web Developer",
  "Product Manager",
  "Project Manager",
  "Graphic Designer",
  "UX/UI Designer",
  "Marketing Specialist",
  "Sales Representative",
  "Business Analyst",
  "Systems Administrator",
  "Network Engineer",
  "Quality Assurance Engineer",
  "Database Administrator",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Content Writer",
  "SEO Specialist",
  "Digital Marketing Manager",
  "Customer Support Specialist",
  "Account Manager",
  "Human Resources Manager",
  "Financial Analyst",
  "Operations Manager",
  "Research Scientist",
  "Civil Engineer",
  "Electrical Engineer",
  "Mechanical Engineer",
  "Pharmacist",
  "Nurse",
  "Teacher",
  "Data Entry Clerk",
  "Administrative Assistant",
  "Social Media Manager",
  "Video Editor",
  "SEO Analyst",
  "Cybersecurity Analyst",
  "Full Stack Developer",
  "Mobile App Developer",
  "IT Support Specialist",
  "Web Designer",
  "Content Strategist",
  "Technical Writer",
  "Insurance Agent",
  "Real Estate Agent",
  "Supply Chain Manager",
  "Product Designer",
  "Watchman",
  "Driver",
  "Home Teacher",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Chef",
  "Waiter/Waitress",
  "Barista",
  "Retail Sales Associate",
  "Warehouse Worker",
  "Janitor",
  "Security Guard",
  "Construction Worker",
  "Fitness Trainer",
  "Personal Assistant",
  "Project Coordinator",
  "Event Planner",
  "Real Estate Developer",
  "Quality Control Inspector",
  "Customer Service Manager",
  "Marketing Manager",
  "Research Analyst",
  "Social Worker",
  "Accountant",
  "Veterinarian",
  "Massage Therapist",
  "Copywriter",
  "Public Relations Specialist",
  "Insurance Underwriter",
  "Logistics Coordinator",
  "Translator",
  "Interpreter",
  "Landscape Architect",
  "Biomedical Engineer",
  "Statistician",
  "Game Developer",
];
import { AuthContext } from '../../providers/AuthProviders';
import Load from "../../components/Load";
import Swal from "sweetalert2";

const Settings = () => {
  const { curUser } = useContext(AuthContext);
  console.log('cur ',curUser)
  const [enabledPrivate, setEnabledPrivate] = useState(curUser?.isPrivate || false);
  const [enabledJob, setEnabledJob] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [customJob, setCustomJob] = useState('');
  const [jobOptions, setJobOptions] = useState(initialJobOptions);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const owner = JSON.parse(localStorage.getItem("user"));
  const handlePrivateSwitchChange = (checked) => {
    setEnabledPrivate(checked);
  };

  const handleJobSwitchChange = (checked) => {
    setEnabledJob(checked);
    if (!checked) {
      setSelectedJobs([]); // Reset the job selection when switching off
    }
  };

  const handleJobSelection = (value) => {
    setSelectedJobs(value); // Update selected jobs
  };

  const handleAddJobClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (customJob && !jobOptions.includes(customJob)) {
      setJobOptions((prevOptions) => [...prevOptions, customJob]); // Add the new job to options
      setSelectedJobs((prev) => [...prev, customJob]); // Select the newly added job
      setCustomJob(''); // Clear the input field
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleCustomJobChange = (e) => {
    setCustomJob(e.target.value);
  };

  const filteredOptions = jobOptions.filter(job =>
    job.toLowerCase().includes(customJob.toLowerCase())
  );

  const handleIsPrivate = () =>{
      const payload = {
        uid:owner._id,
        isPrivate: enabledPrivate,
      };
  
      axios.post('http://localhost:5000/users/private', payload)
        .then(res => {
          console.log(res);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title:"Update Private Account Setting" , //"Your work has been saved"
            showConfirmButton: false,
            timer: 700
          });
          // setIsLiked(!isLiked);
        })
        .catch(err => console.log(err));

  }
  if(!curUser)return <Load></Load>
  return (
    <div className="bg-white p-6">
      {/* Private Account Setting */}
      <h1>{curUser.email}</h1>
      <div className="max-w-lg bg-gray-50 p-6 mb-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Private Account Setting</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enable this option to make your account Private.
        </p>
        <div className="flex items-center justify-between">
          <Switch
            checked={enabledPrivate}
            onChange={handlePrivateSwitchChange}
            className="mr-4"
            style={{ backgroundColor: enabledPrivate ? '' : '#d9d9d9' }}
          />
          <Button onClick={handleIsPrivate} type="primary" className="bg-blue-500">
            Save
          </Button>
        </div>
      </div>

      {/* Job Seeking Status */}
      <div className="max-w-lg bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Job Seeking Status</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enable this option to notify recruiters that you are looking for a job.
        </p>
        <div className="flex items-center justify-between mb-4">
          <Switch
            checked={enabledJob}
            onChange={handleJobSwitchChange}
            className="mr-4"
            style={{ backgroundColor: enabledJob ? '' : '#d9d9d9' }}
          />
          <Button 
          
          type="primary" className="bg-blue-500">
            Save
          </Button>
        </div>

        {/* Job Selection Dropdown with Add Button */}
        {enabledJob && (
          <div className="flex items-center space-x-2">
            <Select
              mode="multiple"
              placeholder="Select job types"
              style={{ flex: 1 }} // Take the available space
              onChange={handleJobSelection}
              value={selectedJobs}
              showSearch
              onSearch={setCustomJob} // Update input as user types
            >
              {filteredOptions.map((job) => (
                <Select.Option key={job} value={job}>
                  {job}
                </Select.Option>
              ))}
            </Select>

            {filteredOptions.length === 0 && (
              <Button type="dashed" onClick={handleAddJobClick}>
                Add New Job Name
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Modal for Adding New Job */}
      <Modal
  title="Add New Job"
  visible={isModalVisible}
  onOk={handleModalOk}
  onCancel={handleModalCancel}
  okButtonProps={{ className: "bg-blue-500 text-white hover:bg-blue-500" }} // Tailwind classes
>
  <Input
    placeholder="Enter job title"
    value={customJob}
    onChange={handleCustomJobChange}
  />
</Modal>

    </div>
  );
};

export default Settings;

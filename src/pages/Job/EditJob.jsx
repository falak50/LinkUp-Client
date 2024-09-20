import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
//  setList, setSelectedJob
export default function EditJob({ job,setReset }) {
  const [open, setOpen] = useState(false);
  const owner = JSON.parse(localStorage.getItem("user"));
  const [form] = Form.useForm();

  useEffect(() => {
    if (job) {
      form.setFieldsValue({
        title: job.title,
        location: job.location,
        description: job.description,
        workType: job.workType,
        timing: job.timing,
      });
    }
  }, [job, form]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    const uid = owner?._id;

    form
      .validateFields()
      .then((values) => {
        const formData = {
          ...values,
          uid,
        };
      
        axios
          .post(`http://localhost:5000/jobs/edit/${job._id}`, formData)
          .then((res) => {
            console.log("Response:", res);
            setOpen(false);
            form.resetFields();
            setReset(pre=>pre+1);
          
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const removeJob = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/jobs/delete/${id}`
      );
      console.log("Delete Response:", response);

      setReset(pre=>pre+1);
      // setList((prevList) => {
      //   const updatedList = prevList.filter((job) => job._id !== id);
      //   if (updatedList.length > 0) {
      //     setSelectedJob(updatedList[0]);
      //   } else {
      //     setSelectedJob(null);
      //   }
      //   return updatedList;
      // });

      setOpen(false); // Close the modal after deletion
    } catch (error) {
      console.log("Error deleting job:", error);
    }
  };

  return (
    <div className="p-6">
      <Button
        onClick={showModal}
        className="text-blue-400  px-4 py-2 rounded-md"
      >
        <FiEdit />
      </Button>
      <Modal
        open={open}
        title={<h2 className="text-xl font-bold">Edit Job</h2>}
        onCancel={handleCancel}
        footer={null} // Custom footer for the modal
      >
        <Form
          form={form}
          layout="vertical"
          className="space-y-4"
          name="job_form"
          initialValues={{
            title: job?.title,
            location: job?.location,
            description: job?.description,
            workType: job?.workType,
            timing: job?.timing,
          }}
        >
          <Form.Item
            name="title"
            label={
              <span className="text-gray-700 font-semibold">Job Title</span>
            }
            rules={[{ required: true, message: "Please input the job title!" }]}
          >
            <Input placeholder="Enter job title" />
          </Form.Item>

          <Form.Item
            name="location"
            label={
              <span className="text-gray-700 font-semibold">Location</span>
            }
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="text-gray-700 font-semibold">Description</span>
            }
            rules={[
              { required: true, message: "Please input the job description!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter job description" />
          </Form.Item>

          <Form.Item
            name="workType"
            label={
              <span className="text-gray-700 font-semibold">Work Type</span>
            }
            rules={[
              { required: true, message: "Please select the work type!" },
            ]}
          >
            <Radio.Group>
              <Radio value="Remote">Remote</Radio>
              <Radio value="On-site">On-site</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="timing"
            label={
              <span className="text-gray-700 font-semibold">Job Timing</span>
            }
            rules={[
              { required: true, message: "Please select the job timing!" },
            ]}
          >
            <Radio.Group>
              <Radio value="Full-time">Full-time</Radio>
              <Radio value="Part-time">Part-time</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>

        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={() => removeJob(job._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </Button>

          <div className="flex space-x-4">
            <Button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleOk}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

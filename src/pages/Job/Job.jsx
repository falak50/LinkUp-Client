
import  { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import axios from 'axios';
import { IoIosAdd, IoMdAdd } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';

export default function Job({ setList }) {
  const [open, setOpen] = useState(false);
  const owner = JSON.parse(localStorage.getItem("user"));
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    const uid = owner?._id;

    form.validateFields()
      .then(values => {
        // Combine form values with user ID
        const formData = {
          ...values,
          uid, // Add the user ID
        };

        // Make POST request using axios
        axios.post('http://localhost:5000/jobs', formData)
          .then(res => {
            console.log('Response:', res);
            const obj =  {
              ...formData,
              _id: res.data.insertedId, // Use the ID from the response
              createdAt: new Date().toISOString(), // Use current date as createdAt
              userInfo: {
                email: owner.email,
                first_name: owner.first_name,
                last_name: owner.last_name,
                ProfileImgURL: owner.ProfileImgURL || "https://via.placeholder.com/150"
              }
          }
         console.log('obj ',obj)
            setList(pre => [obj,...pre])
            setOpen(false);
            form.resetFields(); // Reset form fields after submission
          })
          .catch(err => {
            console.log('Error:', err);
          });
      })
      .catch(info => {
        console.log('Validation Failed:', info);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields(); // Reset the form when modal is closed
  };

  return (
    <div className="p-6">
      {/* <Button
        type="primary"
        onClick={showModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        <IoIosAdd className='text-xl'/>
        post
      </Button> */}
      <button
     onClick={showModal}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 hover:bg-blue-700"
>
<IoMdAdd className='text-xl font-serif' />
    <span className="font-serif text-sm">Post</span>
</button>
      <Modal
        open={open}
        title={<h2 className="text-xl font-bold">Post Job</h2>}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        footer={null} // We will style the footer manually
      >
        <Form
          form={form}
          layout="vertical"
          className="space-y-4"
          name="job_form"
        >
          <Form.Item
            name="title"
            label={<span className="text-gray-700 font-semibold">Job Title</span>}
            rules={[{ required: true, message: 'Please input the job title!' }]}
            className="form-group"
          >
            <Input
              placeholder="Enter job title"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="location"
            label={<span className="text-gray-700 font-semibold">Location</span>}
            rules={[{ required: true, message: 'Please input the location!' }]}
            className="form-group"
          >
            <Input
              placeholder="Enter location"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="text-gray-700 font-semibold">Description</span>}
            rules={[{ required: true, message: 'Please input the job description!' }]}
            className="form-group"
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter job description"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="workType"
            label={<span className="text-gray-700 font-semibold">Work Type</span>}
            rules={[{ required: true, message: 'Please select the work type!' }]}
            className="form-group"
          >
            <Radio.Group className="space-x-4">
              <Radio value="Remote">Remote</Radio>
              <Radio value="On-site">On-site</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="timing"
            label={<span className="text-gray-700 font-semibold">Job Timing</span>}
            rules={[{ required: true, message: 'Please select the job timing!' }]}
            className="form-group"
          >
            <Radio.Group className="space-x-4">
              <Radio value="Full-time">Full-time</Radio>
              <Radio value="Part-time">Part-time</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>

        <div className="flex justify-end mt-6 space-x-4">
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
      </Modal>
    </div>
  );
}

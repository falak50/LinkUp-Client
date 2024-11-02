import { useState, useRef } from 'react';
import { Button, Modal, Form, Input, Radio, Select } from 'antd';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';
import { useParams } from 'react-router-dom';
const pathLink = "http://localhost:5000/images/";
const { TextArea } = Input;
const { Option } = Select;
const categories = [
    { name: "Mobiles", pathname: "mobiles" },
    { name: "Electronics", pathname: "electronics" },
    { name: "Vehicles", pathname: "vehicles" },
    { name: "Property", pathname: "property" },
    { name: "Home & Living", pathname: "home-living" },
    { name: "Pets & Animals", pathname: "pets-animals" },
    { name: "Women's Fashion & Beauty", pathname: "womens-fashion-beauty" },
    { name: "Men's Fashion & Grooming", pathname: "mens-fashion-grooming" },
    { name: "Hobbies, Sports & Kids", pathname: "hobbies-sports-kids" },
    { name: "Business & Industry", pathname: "business-industry" },
    { name: "Education", pathname: "education" },
    { name: "Essentials", pathname: "essentials" },
    { name: "Services", pathname: "services" },
    { name: "Agriculture", pathname: "agriculture" },
    { name: "Jobs", pathname: "jobs" },
    { name: "Overseas Jobs", pathname: "overseas-jobs" },
  ] 
export default function SellPost() {
  const [open, setOpen] = useState(false);
  const owner = JSON.parse(localStorage.getItem("user"));
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const showModal = () => {
    setOpen(true);
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    const imageFiles = fileList.filter((file) => file.type.startsWith("image/"));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOk = () => {
    const uid = owner?._id;
    form.validateFields()
      .then((values) => {
        if (values.priceAmount < 0) {
          alert('Price cannot be negative!');
          return;
        }
  
        const formData = new FormData();
        formData.append("uid", uid);
        formData.append("category", values.category); // Append the pathname here
  
        images.forEach((image) => formData.append("images", image)); // Changed "file" to "images" to match your previous code
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });
  
        axios.post('http://localhost:5000/products/addSellPost', formData)
          .then((res) => {
            console.log('Response:', res);
            // setOpen(false);
            // form.resetFields();
            setImages([]);
          })
          .catch((err) => console.error('Error:', err));
      })
      .catch((info) => console.error('Validation Failed:', info));
  };
  

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setImages([]);
  };

  return (
    <div className="p-6 flex justify-center">
      <button
        onClick={showModal}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-md flex items-center justify-center space-x-2 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
      >
        <IoMdAdd className="text-2xl" />
        <span className="font-semibold">Sell Product</span>
      </button>

      <Modal
        open={open}
        title={<h2 className="text-2xl font-bold text-center font-serif">Advertise Your Product</h2>}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        width={700}
        bodyStyle={{ padding: '20px' }}
      >
        <Form
          form={form}
          layout="vertical"
          name="product_form"
          className="space-y-4"
        >
          <Form.Item
            name="title"
            label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Product Title</span>}
            rules={[{ required: true, message: 'Please input the product title!' }]}
          >
            <Input placeholder="Enter product title" className="rounded-md" />
          </Form.Item>

          <Form.Item
  name="category"
  label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Category</span>}
  rules={[{ required: true, message: 'Please select a category!' }]}
>
  <Select placeholder="Select category" className="rounded-md">
    {categories.map((category) => (
      <Option key={category.pathname} value={category.pathname}>
        {category.name}
      </Option>
    ))}
  </Select>
</Form.Item>



          <Form.Item
            name="location"
            label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Location</span>}
            rules={[{ required: true, message: 'Please input the location!' }]}
          >
            <Input placeholder="Enter location" className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="condition"
            label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Condition</span>}
            rules={[{ required: true, message: 'Please select the condition!' }]}
          >
            <Radio.Group>
              <Radio value="New">New</Radio>
              <Radio value="Used">Used</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="brand"
            label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Brand</span>}
          >
            <Input placeholder="Enter brand" className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="model"
            label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Model</span>}
          >
            <Input placeholder="Enter model" className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="edition"
            label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Edition</span>}
          >
            <Input placeholder="Enter edition" className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="authenticity"
            label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Authenticity</span>}
          >
            <Radio.Group>
              <Radio value="Original">Original</Radio>
              <Radio value="Replica">Replica</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="features" label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Features</span>}>
            <TextArea rows={3} placeholder="Enter features separated by commas" className="rounded-md" />
          </Form.Item>

          <Form.Item name="specifications" label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Specifications</span>}>
            <TextArea rows={3} placeholder="Enter specifications separated by commas" className="rounded-md" />
          </Form.Item>

          <Form.Item
            name="priceAmount"
            label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Price </span>}
            rules={[{ required: true, message: 'Please input the price amount!' }]}
          >
            <Input type="number" placeholder="Enter price amount" className="rounded-md" />
          </Form.Item>

          <Form.Item name="price" label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Price Type</span>}>
            <Radio.Group>
              <Radio value="Fixed">Fixed</Radio>
              <Radio value="Negotiable">Negotiable</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label={<span className="text-lg font-semibold text-gray-800 mb-2 block">Images</span>}>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button onClick={() => fileInputRef.current.click()} className="bg-blue-700 text-white rounded-md hover:bg-blue-900 px-3 p-2">
              Upload Images
            </button>
            <div className="flex flex-wrap gap-3 mt-3">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    className="w-24 h-24 object-cover rounded-md shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-white text-black rounded-full  hover:bg-[gray] w-6 h-6"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>

        <div className="flex justify-end mt-6 space-x-4">
          <Button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-400">
            Cancel
          </Button>
          <Button type="primary" onClick={handleOk} className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
}

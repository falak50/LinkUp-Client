import { useState } from 'react';
import axios from 'axios';

const Home1 = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      files[i].title = "falak";
      console.log("file info ", files[i]);
      formData.append(`file`, files[i]);
    }

    formData.append('title', 'This is a pic');
    formData.append('age', '12');

    axios.post('http://localhost:5000/upload', formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handleAddImage = (e) => {
    const fileInput = e.target.nextSibling;
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...fileList]);
  };

  const handleRemoveImage = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div>
        {files.map((file, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={URL.createObjectURL(file)} alt={`Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
            <button className='btn btn-square btn-sm' onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>

      <div>
        <button className='btn btn-square btn-lg' onClick={handleAddImage}>Add Image</button>
        <input type="file" onChange={handleFileChange} multiple style={{ display: 'none' }} />
        <button className='btn btn-square btn-lg' onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Home1;

import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { IoImagesSharp } from "react-icons/io5";
import axios from 'axios';
import useUserinfo from '../../../hooks/useUserinfo';
import useMypost from '../../../hooks/useMypost';

const MypostEdit = ({ post ,open , setOpen ,setResetCount }) => {
    const [userInfo, ] = useUserinfo();
    const [, Mypostsrefetch, , ] = useMypost();
    const [files, setFiles] = useState([]);
    const [inputValue, setInputValue] = useState(post.description || '');
    // const [open, setOpen] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        if (post.imgUrls) {
            const fetchFiles = async () => {
                const filePromises = post.imgUrls.map(async url => {
                    const response = await fetch(`http://localhost:5000/images/${url}`);
                    const blob = await response.blob();
                    return new File([blob], url, { type: blob.type });
                });
                const fileList = await Promise.all(filePromises);
                setFiles(fileList.map(file => ({ file, isExisting: true })));
            };
            fetchFiles();
        }
    }, [post]);

    const handleAddImage = (e) => {
        const fileInput = e.target.nextSibling;
        fileInput.click();
    };

    const handleFileChange = (e) => {
        const fileList = Array.from(e.target.files).map(file => ({ file, isExisting: false }));
        setFiles(prevFiles => [...prevFiles, ...fileList]);
    };

    const handleRemoveImage = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            description: post.description || ''
        }
    });

    useEffect(() => {
        reset({ description: post.description });
    }, [post, reset]);
    const owner = JSON.parse(localStorage.getItem('user'));
    const onSubmit = (data) => {
        const uid = owner?._id;
        const formData = new FormData();

        files.forEach(fileObj => {
            formData.append('file', fileObj.file);
        });

        formData.append('description', data.description);
        formData.append('uid', uid);

        axios.post(`http://localhost:5000/posts/${post._id}`, formData)
            .then(res => {
                console.log('res ',res)
                // Mypostsrefetch();
                setOpen(false);
                setResetCount(p=>p+1)
            })
            .catch(err => console.log(err));
    };

    const handleExternalSubmit = () => {
        if (formRef.current) {
            handleSubmit(onSubmit)();
        }
    };

    const handleInput = (event) => {
        setInputValue(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    };

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="md"
                className="mx-auto"
                PaperProps={{
                    style: {
                        maxHeight: '90vh',
                        minHeight: "250px",
                        marginTop: '3%',
                        marginBottom: '3%',
                        overflowY: 'auto',
                        position: 'absolute',
                        top: '0',
                    },
                }}
                sx={{
                    width: '100%',
                    '@media (min-width:1000px)': {
                        width: '70%',
                    },
                    '@media (min-width:1224px)': {
                        width: '50%',
                    },
                }}
            >
                <DialogTitle id="scroll-dialog-title" className="flex justify-between">
                    <div className="text-2xl mt-2 mx-6">Edit Post</div>
                    <button
                        onClick={handleClose}
                        className="btn btn-circle border-none bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl"
                    >
                        <IoMdClose />
                    </button>
                </DialogTitle>
                <DialogContent dividers>
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body mb-0 mt-0 top-[-20px] relative"
                    >
                        <div className="form-control">
                            <textarea
                                value={inputValue}
                                onInput={handleInput}
                                placeholder="What do you want to talk about?"
                                {...register('description')}
                                style={{
                                    overflowY: 'hidden',
                                    width: '100%',
                                    height: 'auto',
                                    border: 'none',
                                    outline: 'none',
                                }}
                            />
                        </div>

                        <div>
                            {files.map((fileObj, index) => (
                                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        src={fileObj.isExisting ? `http://localhost:5000/images/${fileObj.file?.name}` : URL.createObjectURL(fileObj.file)}
                                        alt={`Image ${index}`}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <button
                                        type='button'
                                        className='btn btn-circle btn-sm'
                                        style={{ position: 'absolute', top: '0', right: '0' }}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </form>
                </DialogContent>

                <DialogActions
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 24px',
                    }}
                >
                    <button className='btn btn-square btn-md' onClick={handleAddImage}><IoImagesSharp /></button>
                    <input type="file" onChange={handleFileChange} multiple style={{ display: 'none' }} />

                    <button
                        onClick={handleExternalSubmit}
                        className="btn bg-[#0a66c2] text-white rounded-full px-6 py-2 text-xl mr-2"
                    >
                        Save
                    </button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default MypostEdit;

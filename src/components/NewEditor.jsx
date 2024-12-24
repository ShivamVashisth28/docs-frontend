import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const NewEditor = () => {

  const [editorContent, setEditorContent] = useState('');

  const {documentId} = useParams() 

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };


  const getContent = async ()=>{
    const response = await axios.get(`http://localhost:5000/document/content?documentId=${documentId}`)
    const data = response.data

    if(data['status'] === 'success'){
      setEditorContent(data['content'])
    }
  }

  const saveContent = async ()=>{
    const response = await axios.post(`http://localhost:5000/document/content?documentId=${documentId}`, {content:editorContent})
    const data = response.data

    if(data['status'] !== 'success'){
      toast.error(data['message'])
    }
   
  }

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (editorContent.trim()) {
        saveContent(editorContent);
      }
    }, 1000); 

    return () => clearTimeout(debounceTimeout);
  }, [editorContent]);

  useEffect(()=>{
    getContent()
  },[])

  return (
    <div>

      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        style={{ height: '40rem', width: "50rem", }}
        
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean']
          ]
        }}
        placeholder="Write something..."
      />
      <ToastContainer/>
    </div>
  );
};

export default NewEditor;

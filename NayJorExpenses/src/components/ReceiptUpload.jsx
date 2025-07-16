import React, { useState } from 'react';
import API from '../utils/api';
import '../ComponentsStyles/ReceiptUpload.css'; // Importing CSS for styling

const ReceiptUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please choose a file to upload.');

    const formData = new FormData();
    formData.append('receipt', file);

    setUploading(true);
    try {
      const res = await API.post('/expenses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUploadSuccess(res.data);
      setMessage('Upload successful!');
      setFile(null);
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('Upload failed');
    }
    setUploading(false);
  };

  return (
    <div className="upload-container">
      <h3>Upload Receipt</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} accept="image/*" />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default ReceiptUpload;

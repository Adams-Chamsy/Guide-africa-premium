import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import apiClient from '../api/apiClient';

const ImageUpload = ({ value, onChange, label }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    setError('');

    // Validate client-side
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Format non supporté. Utilisez JPG, PNG, WebP ou GIF.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Le fichier dépasse 5 MB.');
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });
      const imageUrl = response.data.url;
      onChange(imageUrl);
    } catch (err) {
      const msg = err.response?.data?.message || 'Erreur lors de l\'upload.';
      setError(msg);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="image-upload-wrapper">
      {label && <label className="image-upload-label">{label}</label>}

      {value ? (
        <div className="image-upload-preview">
          <img src={value.startsWith('/api') ? value : value} alt="Aperçu" />
          <div className="image-upload-preview-overlay">
            <button type="button" className="btn-remove-image" onClick={handleRemove}>
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`upload-zone ${dragActive ? 'upload-zone-active' : ''} ${uploading ? 'upload-zone-uploading' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />

          {uploading ? (
            <div className="upload-progress-wrapper">
              <div className="upload-progress-bar">
                <div className="upload-progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="upload-progress-text">{progress}%</span>
            </div>
          ) : (
            <>
              <span className="upload-zone-icon">&#128247;</span>
              <p className="upload-zone-text">
                Glissez une image ici ou <span className="upload-zone-link">parcourir</span>
              </p>
              <p className="upload-zone-hint">JPG, PNG, WebP ou GIF — Max 5 MB</p>
            </>
          )}
        </div>
      )}

      {error && <p className="upload-error">{error}</p>}
    </div>
  );
};

ImageUpload.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default ImageUpload;

// app/page.jsx
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Load uploaded images from public/uploads folder
  useEffect(() => {
    fetch('/uploads/list.json') // We'll generate this manually for now
      .then(res => res.json())
      .then(setImages)
      .catch(() => setImages([]));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    setIsUploading(true);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      const { fileName } = await res.json();
      setImages(prev => [...prev, fileName]);
      setSelectedFile(null);
    }
    setIsUploading(false);
  };

  return (
    <main className="bg-black min-h-screen text-white px-4 md:px-8 py-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-pink-500">Image Hub</h1>
        <nav className="space-x-4 text-sm md:text-base">
          <span className="hover:text-pink-400 cursor-pointer">Home</span>
          <span className="hover:text-pink-400 cursor-pointer">Upload</span>
        </nav>
      </header>

      <form onSubmit={handleUpload} className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="text-white"
        />
        <button
          type="submit"
          className="ml-4 bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Uploaded Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`/uploads/${img}`}
            alt="Uploaded"
            className="w-full rounded shadow"
          />
        ))}
      </div>

      <footer className="text-center text-sm text-gray-500 mt-12">
        © 2025 Image Hub
      </footer>
    </main>
  );
}

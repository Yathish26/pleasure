'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Tools/Header';

export default function Home() {
    const [previewImages, setPreviewImages] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);

    // Fetch uploaded images from backend
    const fetchUploadedImages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/celebpaps/images');
            if (response.status === 200 && response.data.images) {
                setUploadedImages(response.data.images);
            }
        } catch (error) {
            console.error('Failed to fetch uploaded images:', error);
        }
    };

    useEffect(() => {
        fetchUploadedImages();
    }, []);

    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;

        // Show preview
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setPreviewImages(prev => [...prev, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

        // Upload each file
        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post('http://localhost:5000/api/celebpaps/upload-image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.status === 200 && response.data.imageUrl) {
                    setUploadStatus('✅ Image uploaded successfully!');
                    // Refresh gallery
                    fetchUploadedImages();
                } else {
                    setUploadStatus('⚠️ Upload failed: Invalid response.');
                }
            } catch (error) {
                console.error(error);
                setUploadStatus('❌ Upload failed: Server error.');
            }

            // Clear status after 3 seconds
            setTimeout(() => setUploadStatus(''), 3000);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 px-4 md:px-8 py-8 text-gray-800">
            <Header />

            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10 border border-pink-200">
                <label className="block mb-3 text-lg font-semibold text-pink-500">
                    Upload Images
                </label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full border border-blue-300 p-2 rounded-md bg-blue-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-200 file:text-pink-800 hover:file:bg-pink-300 transition"
                />
                {uploadStatus && (
                    <div className="mt-3 text-green-600 font-semibold">{uploadStatus}</div>
                )}
            </div>

            {uploadedImages.length > 0 && (
                <section className="px-2 md:px-8">
                    <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">📸 Uploaded Album</h2>
                    <div
                        className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4"
                        style={{ columnGap: '1rem' }}
                    >
                        {uploadedImages.map((img, index) => (
                            <div
                                key={index}
                                className="break-inside-avoid rounded-xl overflow-hidden shadow-md border border-pink-100 hover:scale-105 transition transform bg-white"
                                style={{ marginBottom: '1rem' }}
                            >
                                <img
                                    src={img.url}
                                    alt={`Uploaded ${index}`}
                                    className="w-full object-cover"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

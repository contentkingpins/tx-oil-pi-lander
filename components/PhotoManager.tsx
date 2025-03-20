import React, { useState, useEffect } from 'react';

interface Photo {
  id: string;
  name: string;
  url: string;
  category: string;
  uploadDate: string;
}

const PhotoManager: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('accident-scene');
  const [message, setMessage] = useState('');

  // Photo categories specific to Texas oil field accidents
  const categories = [
    { id: 'accident-scene', label: 'Accident Scene' },
    { id: 'equipment-failure', label: 'Equipment Failure' },
    { id: 'oil-rig', label: 'Oil Rig' },
    { id: 'pipeline', label: 'Pipeline' },
    { id: 'burn-injury', label: 'Burn Injury' },
    { id: 'safety-violation', label: 'Safety Violation' },
    { id: 'worksite', label: 'Worksite' },
    { id: 'drilling-operation', label: 'Drilling Operation' },
  ];

  useEffect(() => {
    // Load photos from local storage for demonstration
    const savedPhotos = localStorage.getItem('oilFieldPhotos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setMessage('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    
    // In a real implementation, you would upload to a server
    // This is a simulated upload for demonstration
    setTimeout(() => {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        name: selectedFile.name,
        url: URL.createObjectURL(selectedFile),
        category: category,
        uploadDate: new Date().toISOString(),
      };
      
      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      
      // Save to local storage for persistence
      localStorage.setItem('oilFieldPhotos', JSON.stringify(updatedPhotos));
      
      setSelectedFile(null);
      setUploading(false);
      setMessage('Photo uploaded successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== id);
    setPhotos(updatedPhotos);
    localStorage.setItem('oilFieldPhotos', JSON.stringify(updatedPhotos));
    setMessage('Photo deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-xl shadow-soft-xl p-6 border border-gray-200">
        <h2 className="heading-md mb-6">Texas Oil Field Accident Photo Management</h2>
        
        <form onSubmit={handleUpload} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Photo Category
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="form-input"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className={`btn-primary w-full md:w-auto ${uploading || !selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </div>
        </form>
        
        {message && (
          <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <div>
          <h3 className="heading-sm mb-4">Your Photos</h3>
          
          {photos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No photos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="card group">
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                    <img 
                      src={photo.url} 
                      alt={photo.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-800 truncate">{photo.name}</h4>
                      <span className="badge-primary mt-1">
                        {categories.find(cat => cat.id === photo.category)?.label || photo.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete photo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-bold text-gray-700 mb-2">Photo Guidelines:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Upload high-quality images related to Texas oil field accidents</li>
            <li>Ensure you have permission to use all uploaded photos</li>
            <li>Do not include personally identifiable information</li>
            <li>Photos should be relevant to injury claims in Texas oil fields</li>
            <li>Recommended size: 1200 × 800 pixels or larger</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotoManager; 
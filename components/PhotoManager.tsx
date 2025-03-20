import React, { useState, useEffect } from 'react';

interface Photo {
  id: string;
  name: string;
  url: string;
  category: string;
  uploadDate: string;
  metadata?: {
    location?: string;
    timestamp?: string;
    notes?: string;
    tags?: string[];
    weather?: string;
  };
}

const PhotoManager: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('accident-scene');
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  const [tags, setTags] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Photo categories specific to Texas oil field accidents
  const categories = [
    { id: 'accident-scene', label: 'Accident Scene Overview' },
    { id: 'equipment-failure', label: 'Equipment Failure' },
    { id: 'oil-rig', label: 'Oil Rig Damage' },
    { id: 'pipeline', label: 'Pipeline Issues' },
    { id: 'burn-injury', label: 'Burn/Injury Evidence' },
    { id: 'safety-violation', label: 'Safety Violations' },
    { id: 'worksite', label: 'Worksite Conditions' },
    { id: 'drilling-operation', label: 'Drilling Operations' },
    { id: 'protective-equipment', label: 'PPE Usage/Failures' },
    { id: 'warning-signs', label: 'Warning Signs' },
    { id: 'environmental', label: 'Environmental Conditions' },
    { id: 'regulatory-evidence', label: 'Regulatory Compliance Evidence' },
  ];

  useEffect(() => {
    // Load photos from local storage for demonstration
    const savedPhotos = localStorage.getItem('oilFieldPhotos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }

    // Try to get user's location if supported by browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
        },
        () => {
          // Silently fail - location is optional
        }
      );
    }
  }, []);

  useEffect(() => {
    // Clean up preview URL when component unmounts or when file changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
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
      const currentTimestamp = new Date().toISOString();
      const parsedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      
      const newPhoto: Photo = {
        id: Date.now().toString(),
        name: selectedFile.name,
        url: URL.createObjectURL(selectedFile),
        category: category,
        uploadDate: currentTimestamp,
        metadata: {
          location: location || 'Not specified',
          timestamp: currentTimestamp,
          notes: notes || 'No notes provided',
          tags: parsedTags,
          weather: weather || 'Not specified'
        }
      };
      
      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      
      // Save to local storage for persistence
      localStorage.setItem('oilFieldPhotos', JSON.stringify(updatedPhotos));
      
      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setNotes('');
      setTags('');
      setWeather('');
      setUploading(false);
      setMessage('Photo uploaded successfully! This evidence is now documented for your case.');
      
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
        <h2 className="heading-md mb-6">Texas Oil Field Accident Photo Documentation</h2>
        
        <form onSubmit={handleUpload} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Photo Evidence
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
              
              {previewUrl && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Evidence Category
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
              
              <div className="mt-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Midland, TX or coordinates"
                  className="form-input"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Weather Conditions (Optional)
                </label>
                <input
                  type="text"
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  placeholder="e.g., Sunny, Rainy, Foggy"
                  className="form-input"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Notes (Important for legal documentation)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe what the photo shows, including any safety violations, equipment failures, etc."
              className="form-input min-h-24"
              rows={3}
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., safety violation, missing guard, osha"
              className="form-input"
            />
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className={`btn-primary w-full md:w-auto ${uploading || !selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploading ? 'Documenting Evidence...' : 'Upload Evidence Photo'}
            </button>
          </div>
        </form>
        
        {message && (
          <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <div>
          <h3 className="heading-sm mb-4">Your Documented Evidence</h3>
          
          {photos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No evidence photos uploaded yet.</p>
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
                    <div className="absolute top-2 right-2">
                      <span className="badge-primary">
                        {categories.find(cat => cat.id === photo.category)?.label || photo.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800 truncate">{photo.name}</h4>
                      <button
                        onClick={() => handleDelete(photo.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete evidence photo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Date:</span> {new Date(photo.uploadDate).toLocaleDateString()}
                      </p>
                      {photo.metadata && (
                        <>
                          <p className="truncate"><span className="font-medium">Location:</span> {photo.metadata.location}</p>
                          {photo.metadata.notes && (
                            <p className="truncate"><span className="font-medium">Notes:</span> {photo.metadata.notes}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-bold text-gray-700 mb-2">Legal Evidence Photo Guidelines:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li><span className="font-medium">Create a chronology:</span> Take photos in sequence to show all aspects of the accident scene</li>
            <li><span className="font-medium">Include overview shots:</span> Show the entire scene from multiple angles first</li>
            <li><span className="font-medium">Document details:</span> Take close-ups of specific equipment failures, hazards, or injuries</li>
            <li><span className="font-medium">Show scale:</span> Include objects for scale reference where appropriate</li>
            <li><span className="font-medium">Document environmental conditions:</span> Weather, visibility, and time of day can be important</li>
            <li><span className="font-medium">Include safety equipment:</span> Document presence or absence of required safety gear</li>
            <li><span className="font-medium">Avoid editing:</span> Don't modify photos as this can compromise their legal value</li>
            <li><span className="font-medium">Date and timestamp:</span> Ensure all photos have accurate time/date information</li>
            <li><span className="font-medium">Follow OSHA guidelines:</span> Document any violations of OSHA standards or regulations</li>
          </ul>
        </div>
        
        <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <h4 className="font-bold text-primary-700 mb-2">Texas Oil Field Accident Settlement Potential:</h4>
          <p className="text-gray-700 mb-3">
            Well-documented evidence can significantly increase your settlement potential. Texas follows a modified comparative negligence rule, 
            meaning your compensation may be reduced if you're partially at fault. Thorough documentation can help establish liability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="font-bold text-2xl text-primary">$4.2M+</p>
              <p className="text-sm text-gray-600">Average settlement for fatal oil field accidents in Texas</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="font-bold text-2xl text-primary">$1.8M+</p>
              <p className="text-sm text-gray-600">Average for severe injuries with proper documentation</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="font-bold text-2xl text-primary">97%</p>
              <p className="text-sm text-gray-600">Success rate with comprehensive photo evidence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoManager; 
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditCms({ closeModal, id }) {
  const [cmsData, setCmsData] = useState({});

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const res = await axios.post('http://localhost:8081/cms_specific', { id });
        setCmsData(res.data);
      } catch (err) {
        console.error('Error fetching CMS data:', err);
      }
    };

    fetchCmsData();
  }, [id]);

  const handleInput = (e) => {
    const { name, type, files, value } = e.target;

    if (type === 'file' && files.length > 0) {
      setCmsData((prevValues) => ({
        ...prevValues,
        [name]: files[0],
      }));
    } else {
      setCmsData((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleContentChange = (value) => {
    setCmsData((prevValues) => ({
      ...prevValues,
      content: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', cmsData.id);
    formData.append('content', cmsData.content);

    try {
      const res = await axios.post('http://localhost:8081/editCms', formData);
      alert('Content updated successfully');
      closeModal(false);
    } catch (err) {
      console.error('Error updating content:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-auto h-auto rounded-lg shadow-lg flex flex-col p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Edit {cmsData?.title}</h1>
          <button
            onClick={() => closeModal(false)}
            className="text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-sm"
          >
            X
          </button>
        </div>

        <div className="flex-1">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-1">
              <label className="flex text-gray-600 text-sm font-bold tracking-wider">Content Title:</label>
              <h6 className="flex text-gray-900 py-3 font-bold tracking-wider">{cmsData?.title}</h6>
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="flex text-gray-600 text-sm font-bold tracking-wider">
                Content :
              </label>
              {cmsData.category === 'image' ? (
                <input
                  type="file"
                  name="content"
                  id="content"
                  onChange={handleInput}
                  placeholder="Content"
                  accept="image/*"
                  className="shadow appearance-none border rounded w-[600px] h-[300px] text-gray-700 focus:outline-none focus:shadow-outline"
                  required
                />
              ) : (
                <div className="shadow border rounded-lg overflow-hidden w-[600px]">
                  <ReactQuill
                    value={cmsData.content || ''}
                    onChange={handleContentChange}
                    className="w-full h-[300px] text-gray-700 focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-textgreenColor hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Edit {cmsData.title}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCms;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Error fetching course:', err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
        
        <p className="text-gray-600 mb-4">{course.description}</p>

        <div className="mb-4">
          <p className="text-lg font-semibold text-green-600">RM {course.price}</p>
          <p className="text-sm text-gray-500 mt-1">Status: {course.status}</p>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => navigate(`/courses/${id}/edit`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow-sm transition"
          >
            Update
          </button>

          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md shadow-sm transition"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

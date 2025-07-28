import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [instructorFilter, setInstructorFilter] = useState('');
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors(); // load once
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [statusFilter, instructorFilter]);

  const fetchInstructors = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users/instructor?role=instructor');
      setInstructors(res.data);
    } catch (err) {
      console.error('Failed to load instructors:', err);
    }
  };

  const getInstructorName = (id) => {
    const instructor = instructors.find((i) => i._id === id);
    return instructor ? instructor.name : 'Unknown';
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/courses', {
        params: {
          status: statusFilter,
          instructor_id: instructorFilter,
        },
      });
      setCourses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/courses/${id}`);
      // Refresh course list
      fetchCourses();
    } catch (err) {
      console.error('Failed to delete course:', err);
    }
  };
  
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* Filters */}
      <div className="flex justify-between items-center mb-6 border p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <label className="mr-2 font-medium">Filter:</label>
            <select
              className="border px-3 py-1 rounded"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="ml-4 mr-2 font-medium">Instructor:</label>
            <select
              className="border px-3 py-1 rounded"
              onChange={(e) => setInstructorFilter(e.target.value)}
            >
              <option value=""></option>
              {instructors.map((inst) => (
                <option key={inst._id} value={inst._id}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Link to="/new/courses">
          <button className="border border-black px-4 py-1 hover:bg-gray-100">
            New Course
          </button>
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div
            key={course._id}
            className="border border-black p-4 rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-700">Price: RM{course.price}</p>
            <p className="text-gray-700">Instructor: {getInstructorName(course.instructor_id)}</p>
            <Link to={`/courses/${course._id}`}>
              <button className="mt-3 border border-black px-3 py-1 hover:bg-gray-100">
                View
              </button>
            </Link>
            <button
              onClick={() => handleDelete(course._id)}
              className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
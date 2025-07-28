import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const navigate = useNavigate();

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/instructor?role=instructor`);
        setInstructors(res.data);
      } catch (err) {
        console.error('Failed to load instructors:', err);
      }
    };
    fetchInstructors();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      instructor_id: '',
      status: 'active',
      image_url: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      price: Yup.number().required('Required'),
      instructor_id: Yup.string().required('Required'),
      status: Yup.string().oneOf(['active', 'inactive']),
      image_url: Yup.string().url('Must be a valid URL').nullable(),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/courses`, values);
        alert('✅ Course created successfully!');
        navigate('/');
      } catch (error) {
        console.error(error);
        alert('❌ Failed to create course');
      }
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="border p-2 w-full"
            {...formik.getFieldProps('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="border p-2 w-full"
            {...formik.getFieldProps('description')}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price (RM)</label>
          <input
            type="number"
            name="price"
            className="border p-2 w-full"
            {...formik.getFieldProps('price')}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 text-sm">{formik.errors.price}</div>
          )}
        </div>

        {/* Instructor */}
        <div>
          <label className="block font-medium">Instructor ID</label>
          <select
            name="instructor_id"
            className="border p-2 w-full"
            {...formik.getFieldProps('instructor_id')}
          >
            <option value="">Select Instructor</option>
            {instructors.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          {formik.touched.instructor_id && formik.errors.instructor_id && (
            <div className="text-red-500 text-sm">{formik.errors.instructor_id}</div>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            className="border p-2 w-full"
            {...formik.getFieldProps('status')}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium">Image URL (optional)</label>
          <input
            type="text"
            name="image_url"
            className="border p-2 w-full"
            {...formik.getFieldProps('image_url')}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;

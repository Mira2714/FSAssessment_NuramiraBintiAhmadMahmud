import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/courses/${id}`);
        setInitialValues(res.data);
      } catch (err) {
        console.error('Error loading course:', err);
      }
    };
    fetchCourse();
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().positive().required('Price is required'),
    status: Yup.string().oneOf(['active', 'inactive']).required('Status is required'),
  });

  const handleSubmit = async (values) => {
    try {
      // exclude _id
      const { _id,isDeleted,deleted_at,createdAt, updatedAt,__v,  ...cleaned } = values;
      await axios.put(`http://localhost:3000/api/courses/${id}`, cleaned);
      alert('Course updated successfully!');
      navigate(`/courses/${id}`);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update course.');
    }
  };

  if (!initialValues) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Update Course</h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <Field name="title" className="w-full border px-3 py-2 rounded mt-1" />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Field as="textarea" name="description" rows="4" className="w-full border px-3 py-2 rounded mt-1" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price (RM)</label>
            <Field name="price" type="number" className="w-full border px-3 py-2 rounded mt-1" />
            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <Field as="select" name="status" className="w-full border px-3 py-2 rounded mt-1">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-gray-200 px-5 py-2 rounded hover:bg-gray-300"
              onClick={() => navigate(`/courses/${id}`)}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditCourse;
import CreateCourseForm from '../components/createCourseForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const navigate = useNavigate();

  const handleCreate = async (values) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/courses`, values);
      alert('✅ Course created');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to create course');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <CreateCourseForm onSubmit={handleCreate} />
    </div>
  );
};

export default CreateCourse;
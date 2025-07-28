// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourseList from './pages/courseList';
import CreateCourse from './pages/createCourse';
import CourseDetails from './pages/courseDetails';
import UpdateCourse from './pages/updateCourse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/new/courses" element={<CreateCourse />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses/:id/edit" element={<UpdateCourse />} />
        {/* <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/create" element={<CreateCourse />} /> */}
      </Routes>
    </BrowserRouter>
    // <div className="min-h-screen p-6 bg-gray-100">
    //   <h1 className="text-3xl font-bold text-center">Courses App</h1>
    // </div>
  );
}

export default App;

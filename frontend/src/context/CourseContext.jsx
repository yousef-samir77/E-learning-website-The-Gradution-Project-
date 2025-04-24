import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import axios from "axios";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]); // To store course data
  const [course, setCourse] = useState(null); // To store a single course data
  const [mycourse, setMyCourse] = useState([true]); // To show loading state
  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses); // Update context with course data
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMyCourse(params) {
    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        token: localStorage.getItem("token"),
      });
      setCourse(data.courses);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);
  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const CourseData = () => useContext(CourseContext);

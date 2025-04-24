import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const CourseDescription = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { user, fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(courseId);
  }, []);

  const handleSubscribe = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `${server}/api/subscribe/${courseId}`,
        {},
        { headers: { token } }
      );
      await fetchUser(); // Fetch user data
      await fetchMyCourse(); // Fetch subscribed courses
      await fetchCourses(); 
      toast.success(data.message);
      // optionally refresh user data or subscribed courses
    } catch (err) {
      toast.error(err.response?.data?.message || "Subscription failed");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      {course && (
        <div className="course-description">
          <div className="course-header">
            <img
              src={`${server}/${course.image}`}
              alt=""
              className="course-image"
            />
            <div className="course-info">
              <h2>{course.title}</h2>
              <p>Instructor: {course.createdBy}</p>
              <p>Duration: {course.duration} weeks</p>
            </div>
          </div>

          <p>{course.description}</p>
          <p>Let's get started with this course at {course.price}</p>

          {user && user.subscription?.includes(course._id) ? (
            <button
              onClick={() => navigate(`/course/study/${course._id}`)}
              className="common-btn"
            >
              Study
            </button>
          ) : (
            <button onClick={handleSubscribe} className="common-btn">
              Buy Now
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CourseDescription;

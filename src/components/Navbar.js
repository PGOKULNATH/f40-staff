import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import DataContext from "../context/data/dataContext";

const MyNavbar = () => {
  const userContext = useContext(UserContext);
  const { user, logout } = userContext;

  const dataContext = useContext(DataContext);
  const {
    myprofile,
    myprofile_loading,
    myprofile_error,
    getEvents,
    getMyProfile,
    getProfile,
    getTasks,
    getScore,
    getAttendance,
    getAssessments,
    getNotifications,
    getCourses
  } = dataContext;

  useEffect(() => {
    getMyProfile().then(() => {
      getEvents();
      getNotifications();
      getProfile();
      getTasks();
      getScore();
      getAssessments();
      getAttendance();
      getCourses();
    });
    //eslint-disable-next-line
  }, []);

  const onChange = e => {
    localStorage.setItem("fmente", e.target.value);
    getProfile();
    getTasks();
    getScore();
    getAttendance();
  };

  return (
    <nav className="navbar navbar-dark navbar-expand-md m-primary-bg">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav mr-auto">
          <Link className="nav-link " to={"/f40-fm/"}>
            Home
          </Link>
          <Link className="nav-link " to={"/f40-fm/Profile"}>
            Profile
          </Link>
          <Link className="nav-link " to={"/f40-fm/Tasks"}>
            Tasks
          </Link>
          <Link className="nav-link " to={"/f40-fm/Score"}>
            Score
          </Link>
          <Link className="nav-link " to={"/f40-fm/Assessments"}>
            Assessments
          </Link>
          <Link className="nav-link " to={"/f40-fm/Attendance"}>
            Attendance
          </Link>
          <Link className="nav-link " to={"/f40-fm/Courses"}>
            {" "}
            Courses{" "}
          </Link>
        </div>
        {!myprofile_loading && myprofile_error === null && (
          <select
            className="form-control col-12 col-md-2 m-2"
            onChange={onChange}
          >
            {myprofile.mentees.map((m, i) => (
              <option key={i}>{m}</option>
            ))}
          </select>
        )}
      </div>
      <span className="navbar-text  mr-2">Hi {user}!</span>
      <Link className="btn btn-danger" to={"/f40/"} onClick={() => logout()}>
        {" "}
        Logout{" "}
      </Link>
    </nav>
  );
};

export default MyNavbar;

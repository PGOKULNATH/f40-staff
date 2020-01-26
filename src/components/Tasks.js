import React, { useContext, useEffect } from "react";
import { Button, Accordion } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";
import server from "../config/server";
import DataContext from "../context/data/dataContext";

const Tasks = () => {
  //context data
  const dataContext = useContext(DataContext);
  const { tasks, tasks_loading, tasks_error, getTasks } = dataContext;

  //get all tasks for this student
  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  }, []);

  //function for not post attachment
  const postAttachement = (task, i) => {
    return (
      <div className="row shadow m-2" key={task._id}>
        <div className="col-12 p-0 m-0">
          <Accordion.Toggle
            as={Button}
            className="col-12 m-negative-bg"
            eventKey={task._id}
          >
            <p className="text-white float-left font-big">
              <b className="text-dark">Topic : </b>
              {task.topic}
            </p>
            <p className="float-right badge badge-light p-3">
              {task.taskType[0].toUpperCase() + task.taskType.slice(1)}
            </p>
            <br />
            <br />
            <p className="text-white float-left font-big">
              <b className="text-dark">Uploaded at : </b>
              {task.uploadTime}
            </p>

            <p className="text-white float-right font-big">
              <b className="text-dark">Deadline : </b>
              {task.deadline}
            </p>
          </Accordion.Toggle>
        </div>
      </div>
    );
  };

  //function for showing the attachment that already submited
  const showAttachement = (task, i) => {
    return (
      <div className="row shadow m-2" key={task._id}>
        <div className="col-12 p-0 m-0">
          <Accordion.Toggle
            as={Button}
            className="col-12 m-positive-bg"
            eventKey={task._id}
          >
            <p className="text-white float-left font-big">
              <b className="text-dark">{i + 1} Topic : </b>
              {task.topic}
            </p>
            <p className="float-right badge badge-light p-3">
              {task.taskType[0].toUpperCase() + task.taskType.slice(1)}
            </p>
            <br />
            <br />
            <p className="text-white float-left font-big">
              <b className="text-dark">Uploaded at : </b>
              {task.uploadTime}
            </p>
            <p className="text-white float-right font-big">
              <b className="text-dark">Deadline : </b>
              {task.deadline}
            </p>
          </Accordion.Toggle>
        </div>
        <Accordion.Collapse eventKey={task._id} className="col-12 p-2 m-2">
          <div className="col-12">
            <div className="row form-group p-2">
              <div className="col-12 col-md-2">
                <b className="font-big text-dark">Attachment: </b>
              </div>
              <div className="col-12 col-md-10">
                <div className="row rounded shadow-sm">
                  {" "}
                  <a
                    href={server + task.attachment.url}
                    rel="noopener noreferrer"
                    className="font-big col-10 col-md-11 m-overflow"
                    target="_blank"
                  >
                    {task.attachment.url.slice(7)}
                  </a>
                </div>
              </div>
            </div>
            <div className="row form-group p-2">
              <div className="col-12 col-md-2">
                <b className="font-big text-dark">Feedback: </b>
              </div>
              <div className="font-big col-12 col-md-10">
                {task.attachment.feedback}
              </div>
            </div>
            <div className="row form-group">
              <div className="col-12 col-md-3">
                <b className="text-dark font-big">Submitted At: </b>
              </div>
              <div className="col-12 col-md-9 font-big">
                {task.attachment.timeStamp}
              </div>
              <div className="text-white font-big badge badge-warning col-10 col-md-3 mt-2 mt-md-0 ml-md-2 p-2">
                {task.attachment.Score !== null
                  ? task.attachment.Score + "/100"
                  : "Not Graded"}
              </div>
            </div>
          </div>
        </Accordion.Collapse>
      </div>
    );
  };

  //will loading during initial
  if (tasks_loading) {
    return <Loading />;
  }

  //any error can be handle by this
  else if (tasks_error) {
    return <Error />;
  }

  //this is will call either show attachment or post attachment functions
  return (
    <Accordion className="container">
      <div className="row m-1">
        <center className="col-12">
          <h3>Tasks</h3>
        </center>
      </div>
      {tasks.map(task =>
        !task.attachment ? postAttachement(task) : showAttachement(task)
      )}
    </Accordion>
  );
};

export default Tasks;

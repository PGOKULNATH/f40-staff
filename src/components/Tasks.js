import React, {useContext, useEffect} from 'react';
import {Button,Accordion} from 'react-bootstrap';
import Loading from './Loading';
import server from '../config/server';
import DataContext from '../context/data/dataContext';

const Tasks = () =>{

  //context data
  const dataContext = useContext(DataContext);
  const { tasks, tasks_loading, tasks_error, getTasks } = dataContext;

  //get all tasks for this student
  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  },[]);

  //function for not post attachment
  const postAttachement = (task,i) => {
    return(
    <div className="row" key={task._id} style={{border:'1px solid rgba(255,0,0,0.9)',margin:'10px',borderRadius:'5px',boxShadow:'0px 0px 2px 2px rgba(255,0,0,0.5)'}}>
      <div className="col-12" style={{padding:'0px',margin:'0px'}}>
        <Accordion.Toggle as={Button} className="col-12" eventKey={task._id} style={{borderColor : 'rgba(255,0,0,0.5)',backgroundColor:'rgba(255,0,0,0.8)',fontSize : '20px'}}>
          <p style={{float:'left'}}><b style={{color:"black"}}>{i+1} Topic : </b>{task.topic}</p>
          <p style={{float:'right', padding: '10px 20px'}} className="badge badge-light">{task.taskType[0].toUpperCase() + task.taskType.slice(1)}</p>
          <p style={{clear: 'both'}}/>
          <p style={{float:'left'}}><b style={{color:"black"}}>Uploaded at : </b><span style={{color : "#1a4f0d"}}>{task.uploadTime}</span></p>
          <p style={{float:'right'}}><b style={{color:'black'}}>Deadline : </b><span style={{color : "#87000b"}}>{task.deadline}</span></p>
        </Accordion.Toggle>
      </div>
    </div>)
  }

  //function for showing the attachment that already submited
  const showAttachement = (task,i) =>{
    return(
    <div className="row" key={task._id} style={{border:'1px solid rgba(0,255,0,0.9)',margin:'10px',borderRadius:'5px',boxShadow:'0px 0px 2px 2px rgba(0,255,0,0.5)'}}>
      <div className="col-12" style={{padding:'0px',margin:'0px'}}>
        <Accordion.Toggle as={Button} className="col-12" eventKey={task._id} style={{borderColor : 'rgba(0,255,0,0.5)',backgroundColor:'rgba(0,255,0,0.8)',fontSize : '20px'}}>
          <p style={{float:'left'}}><b style={{color:"black"}}>{i+1} Topic : </b>{task.topic}</p>
          <p style={{float:'right', padding: '10px 20px'}} className="badge badge-light">{task.taskType[0].toUpperCase() + task.taskType.slice(1)}</p>
          <p style={{clear: 'both'}}/>
          <p style={{float:'left'}}><b style={{color:"black"}}>Uploaded at : </b><span style={{color : "#1a4f0d"}}>{task.uploadTime}</span></p>
          <p style={{float:'right'}}><b style={{color:'black'}}>Deadline : </b><span style={{color : "#87000b"}}>{task.deadline}</span></p>
        </Accordion.Toggle>
      </div>
      <Accordion.Collapse eventKey={task._id} className="col-12" style={{padding:'10px',margin:'5px'}}>
        <div className="col-12">
          <div className="row form-group">
            <div className="col-12 col-md-3"><b style={{padding:"25px 0px", margin:'0px',fontSize:'20px', textShadow:'1px 1px gray'}}>Attachment: </b></div>
            <div className="col-12 col-md-9" style={{padding : '0px 25px'}}>
              <div className="row" style={{border:'1px solid gray',borderRadius:'5px'}}>
                <a href={server + task.attachment.url} rel="noopener noreferrer" className="col-12" style={{padding:'5px 10px',textDecoration:'none', backgroundColor:'#dbd9d9'}} target="_blank">{task.attachment.url.slice(7)}</a>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12 col-md-3"><b style={{padding:"25px 0px", margin:'0px',fontSize:'20px', textShadow:'1px 1px gray'}}>Feedback: </b></div>
            <div className="col-12 col-md-9" style={{fontSize:'20px'}}>
              {task.attachment.feedback}
            </div>
          </div>
          <div className="row form-group">
            <div className="col-12 col-md-3"><b style={{padding:"25px 0px", margin:'0px',fontSize:'20px', textShadow:'1px 1px gray'}}>Submitted At: </b></div>
            <div className="col-12 col-md-6" style={{fontSize:'20px'}}>
              {task.attachment.timeStamp}
            </div>
            <div className="badge badge-warning col-10 col-md-2 mt-2 mt-md-0 ml-md-2 p-2" style={{color:'white',fontSize:'17px'}}>{task.attachment.Score !== null ? task.attachment.Score+"/100" : "Not Graded"}</div>
          </div>
        </div>
      </Accordion.Collapse>
    </div>)
  }

  //will loading during initial
  if(tasks_loading){
    return <Loading/>
  }

  //any error can be handle by this
  else if(tasks_error){
    return <h1>Something goes wrong</h1>
  }

  //this is will call either show attachment or post attachment functions
  return(
    <Accordion className="container">
      <div className="row m-1">
        <center className="col-12">
          <h3>Tasks</h3>
        </center>
      </div>
      {
        tasks.map(task=>!task.attachment ? postAttachement(task) : showAttachement(task))
      }
    </Accordion>
  );
}

export default Tasks;

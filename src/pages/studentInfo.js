import { useState } from "react";
import { Modal } from "react-modal";

const StudentInfo = () => {
    var studentCourses=[]
    const [initialFetch,setInititalFetch]=useState(true)
    const [studentInfo,setStudentInfo]=useState({})
    const [inompleteCourses,setIncompleteCourses]=useState([])
    const [noCourses,setNoCourses]=useState(false)
    const [modalActive,setModalActive]=useState(false)
    const [emptyName,setEmptyName]=useState(false)
    if(initialFetch==true){
        setInititalFetch(false)
        fetch('http://localhost:8000/studentInfo',{
    method:"POST",
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({ID:localStorage.getItem('studentID')})}).then(res=>
        res.json()).then(res=>{
            setStudentInfo(res)})
            .then(()=>{
                fetch('http://localhost:8000/studentIncompletedCourses',{
                    method:"POST",
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify({ID:localStorage.getItem('StudentID'),Completed:false})
                }).then(res=>res.json()).then(res=>{
                    if(res.length==0){
                        console.log("No courses assigned")
                        setNoCourses(true)
                    }
                    else{
                        
                    }
                })
            })
    }
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius:"25px",
          width:'40%',
          height:"60%"
        },
      };
    
    return (<div>
        <div style={{tecxtAlign:"right"}}>Log Out</div>
    <h1>Student Information</h1>
    <button type="button" onClick={()=>{setModalActive(true)}}  style={{float:"right"}} className="btn btn-success btn-sm">
        + Add Course
      </button>
      <Modal
    isOpen={modalActive}
    onRequestClose={modalActive}
    style={customStyles}>
        <div><h1>Add Course</h1></div>
        <div class="mb-3">
    <label for="exampleInputEmail1" className="form-label">Course Name</label>
    <input type="text" onChange={(e)=>setCourseName(e.target.value)} className="form-control" aria-describedby="emailHelp"/>
  </div>

  {emptyName && <div style={{color:"red"}}>Please Enter a Name</div>}
  {courseAdded && <table><tr><td style={{marginRight:"10px"}}>Name</td><td>{courseName}</td></tr>
  <tr><td style={{marginRight:"10px"}}>ID</td><td>{courseID}</td></tr>
  <tr style={{marginBottom:"10px"}}><td style={{marginRight:"10px"}}>Department</td><td>{department}</td></tr></table>}
  <button style={{marginRight:"10px"}} onClick={resetPage} className="btn btn-danger">Close</button>
  <button onClick={addCourse} className="btn btn-success">Add Student</button>
    </Modal> 
        
    <table className="table table-striped">
        <tr><td>Name</td><td>ID</td></tr>
        <tr><td>{studentInfo.Name}</td><td>{studentInfo.ID}</td></tr>
    </table>
    <table className="table table-striped"><thead><tr>
        <td>Course ID</td>
        <td>Course Name</td>
        <td>Select to Delete</td>
        <td>Delete</td></tr></thead></table>
    <div style={{textAlign:"center"}}><button className="btn btn-lg btn-primary margin:auto">&#60;- Back to Instructor Portal </button></div>
    
    </div>  );
}
 
export default StudentInfo;
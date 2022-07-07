import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Modal from "react-modal";

const Department = () => {
    const navigate=useNavigate(false)
    const [modalActive,setModalActive]=useState(false)
    const [initialFetch,setInitialFetch]=useState(true)
    const [courses,setCourses]=useState([])
    const [fetchIndicator,setFetchIndicator]=useState(false)
    const [dCourseList,setDCourseList]=useState([])
    const [newCourseName,setNewCourseName]=useState("")
    const [emptyName,setEmptyName]=useState(false)
    const [addedCourseID,setAddedCourseID]=useState("")
    const [courseAdded,setCourseAdded]=useState(false)
    var deleteCourseList=[]
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
    if(initialFetch==true){
        setInitialFetch(false)
        fetch('http://localhost:8000/fetchCourseList',{
    method:"POST",
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({Department:localStorage.getItem('department')})
}).then(res=>res.json()).then(res=>{
    setCourses(res)
    setFetchIndicator(true)
    })}
    function deleteCourses(){
        dCourseList.forEach(element=>{
            deleteCourse(element)
        }).then(setInitialFetch(true))
       
    }
    function addDeleteCourse(e){
        deleteCourseList=dCourseList
      if(e.target.checked){
        deleteCourseList.push(e.target.value)
      }
      else{
        const courseIndex=deleteCourseList.indexOf(e.target.value)    
        deleteCourseList.splice(courseIndex,1)
      }
      console.log(deleteCourseList)
      setDCourseList(deleteCourseList)

    }
   function addCourse(){
    if(newCourseName==""){
        setEmptyName(true)
    }
    else{
        setEmptyName(false)
    
    fetch('http://localhost:8000/addDepartmentCourse',{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({Name:newCourseName,Department:localStorage.getItem('department')})
        }).then(res=>res.json()).then(res=>{setAddedCourseID(res.ID)
            setCourseAdded(true)

        })}
    }
    function resetPage(){
        setModalActive(false)
        setInitialFetch(true)
    }
    function deleteCourse(ID){
        console.log(ID)
        fetch('http://localhost:8000/removeCourse',{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({ID:ID})
        }).then(setInitialFetch(true))
    }
    
    function logout(){
        localStorage.setItem('adminID','')
      localStorage.setItem('Department','')
      localStorage.setItem('StudentID','')
      localStorage.setItem('department','')
      navigate('/Login')
      }
      function back(){
        localStorage.setItem('department','')
        navigate('/adminPortal')
      }
    return (<div><button style={{float:"right"}} className="btn btn-sm btn-danger" onClick={logout}>Log Out</button>
        <h6>{localStorage.getItem('department')} Courses</h6>
        <button className="btn btn-lg btn-primary" style={{float:"right",marginTop:"15px",marginLeft:"15px"}}>+Add Courses in Bulk</button><button onClick={()=>setModalActive(true)} style={{float:"right",marginTop:"15px",marginLeft:"15px"}} className="btn btn-lg btn-success">+Add Course</button>
        <Modal
    isOpen={modalActive}
    onRequestClose={modalActive}
    style={customStyles}>
        <div><h1>Add Course</h1></div>
        <div class="mb-3">
    <label for="exampleInputEmail1" className="form-label">Course Name</label>
    <input type="text" onChange={(e)=>setNewCourseName(e.target.value)} className="form-control" aria-describedby="emailHelp"/>
  </div>
  {emptyName && <div style={{color:"red"}}>Please Enter a Name</div>}
  {courseAdded && <table><tr><td style={{marginRight:"10px"}}>Name</td><td>{newCourseName}</td></tr>
  <tr><td style={{marginRight:"10px"}}>ID</td><td>{addedCourseID}</td></tr>
  <tr style={{marginBottom:"10px"}}><td style={{marginRight:"10px"}}>Department</td><td>{localStorage.getItem('department')}</td></tr></table>}
  <button style={{marginRight:"10px"}} onClick={resetPage} className="btn btn-danger">Close</button>
  <button onClick={addCourse} className="btn btn-success">Add Course</button>
    </Modal>
        <table className="table table-striped">
            <thead>
                <tr><td>Course Name</td>
                <td>Course ID</td>
                <td>Select to Delete</td>
                <td>Delete</td></tr>
            </thead>
            <tbody>{fetchIndicator && courses.map(element=>{
                return(
                    <tr>
                        <td>{element.Name}</td>
                        <td>{element.ID}</td>
                        <td><input type="checkbox" value={element.ID} onChange={(e)=>addDeleteCourse(e)}/></td>
                        <td><button className="btn btn-danger" onClick={()=>deleteCourse(element.ID)}>Delete</button></td>
                    </tr>
                )
                

            })}<tr><td></td><td></td><td><button onClick={deleteCourses} className="btn btn-sm btn-danger">Delete Selected</button></td><td></td></tr></tbody>
        </table>
        <button onClick={back} style={{float:"center",borderRadius:"25px"}} className="btn btn-lg btn-primary">&#60; Back</button>
    </div>  );
}
 
export default Department;
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
const InstructorPortal = () => {
  const navigate=useNavigate(false)
    const [initialFetch,setInitialFetch]=useState(true)
    const [modalActive,setModalActive]=useState(false)
    const [newStudentName,setNewStudentName]=useState("")
    const [emptyName,setEmptyName]=useState(false)
    const [addedStudentPassword,setAddedStudentPassword]=useState()
    const [addedStudentID,setAddedStudentID]=useState()
    const [studentAdded,setStudentAdded]=useState(false)
    const [studentList,setStudentList]=useState([])
    const [dStudentList,setDStudentList]=useState([])
    var deleteStudentsList=[]
    const[studentListIndicator,setStudentListIndicator]=useState(false)
    if(initialFetch){
        setInitialFetch(false)
        setStudentListIndicator(false)
        fetch('http://localhost:8000/instructor_student_details',{
    method:"POST",
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({department:localStorage.getItem('Department')})
}).then(response=>response.json()).then(response=>{
  console.log(response)
  setStudentList(response)
  setStudentListIndicator(true)
    })}
    function resetPage(){
      setInitialFetch(true)
      setModalActive(false)
      setStudentAdded(false)
    }
    function addDeleteStudent(e){
      deleteStudentsList=dStudentList
      if(e.target.checked){
        deleteStudentsList.push(e.target.value)
      }
      else{
        const index=deleteStudentsList.indexOf(e.target.value)    
        deleteStudentsList.splice(index,1)
      }
      console.log(deleteStudentsList)
      setDStudentList(deleteStudentsList)
    }
    function studentInfo(e){
      localStorage.setItem('studentID',e)
      console.log(e)
      navigate('/studentInfo')
    }
    function logOut(){
      localStorage.setItem('InstructorID','')
      localStorage.setItem('Department','')
      navigate('/Login')
    }
    function deleteStudent(ID){
      console.log(ID)
      fetch('http://localhost:8000/deleteStudent',{
        method:"POST",
headers:{'Content-type':'application/json'},
body:JSON.stringify({ID:ID})
}).then(res=>res.json()).then(res=>console.log(res)).then(setInitialFetch(true))
    }
    function deleteStudents(){
      dStudentList.forEach(element=>{
        deleteStudent(element)
      })
    }
    function addStudent(){
        if(newStudentName==""){
            setEmptyName(true)
        }
        else{
            setEmptyName(false)
            setStudentAdded(false)
            fetch("http://localhost:8000/instructorAddStudent",{
            method:"POST",
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({Name:newStudentName,Department:localStorage.getItem('Department')})
    }).then(res=>res.json()).then(response=>{
        console.log(response.ID)
        fetch("http://localhost:8000/studentDetail",{
            method:"POST",
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({ID:response.ID})
    }).then(res=>res.json()).then(res=>{
        setAddedStudentPassword(res.Password)
        setAddedStudentID(response.ID)
    })
    .then(setStudentAdded(true))

    })}}
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
      <button onClick={logOut} className="btn btn-danger btn-sm" style={{float:"right"}}>Log Out</button><h1>Instructor Portal</h1><h6>Hello {localStorage.getItem('InstructorID')}</h6>
    <button onClick={()=>{setModalActive(true)}} className="btn btn-success btn-lg" style={{float:"right"}}>+Add Student</button>
    <button type="file" className="btn btn-success btn-lg" style={{float:"right",marginRight:"10px",marginBottom:"20px"}}>+Add Students in Bulk</button>
    <Modal
    isOpen={modalActive}
    onRequestClose={modalActive}
    style={customStyles}>
        <div><h1>Add Student</h1></div>
        <div class="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" onChange={(e)=>setNewStudentName(e.target.value)} className="form-control" aria-describedby="emailHelp"/>
  </div>
  {emptyName && <div style={{color:"red"}}>Please Enter a Name</div>}
  {studentAdded && <table><tr><td style={{marginRight:"10px"}}>Name</td><td>{newStudentName}</td></tr>
  <tr><td style={{marginRight:"10px"}}>Password</td><td>{addedStudentPassword}</td></tr>
  <tr><td style={{marginRight:"10px"}}>ID</td><td>{addedStudentID}</td></tr>
  <tr style={{marginBottom:"10px"}}><td style={{marginRight:"10px"}}>Department</td><td>{localStorage.getItem('Department')}</td></tr></table>}
  <button style={{marginRight:"10px"}} onClick={resetPage} className="btn btn-danger">Close</button>
  <button onClick={addStudent} className="btn btn-success">Add Student</button>
    </Modal>
   <table className="table table-striped table-hover" style={{color:"black"}}>
    <thead>
      <tr><td>Name</td>
      <td>ID</td>
      <td>Delete</td></tr>
      
    </thead>
   {studentListIndicator && studentList.map(element=>{
    return(<tr>
      <td>{element.Name}</td>
      <td onClick={(e)=>{studentInfo(element.ID)}}>{element.ID}</td>
      <td><input onChange={(e)=>{addDeleteStudent(e)}} type="checkbox" value={element.ID}/></td>
      <td><button className="btn btn-danger" onClick={()=>{deleteStudent(element.ID)}}>Delete</button></td>
    </tr>)
   })}
   <tr><td></td><td></td><td><button onClick={deleteStudents} className="btn btn-danger">Delete Selected</button></td><td></td></tr>
   </table>
    </div>
      );
}
 
export default InstructorPortal;
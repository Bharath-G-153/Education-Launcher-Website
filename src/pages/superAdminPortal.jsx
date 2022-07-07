import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom'
const SuperAdminPortal = () => {
  const navigate=useNavigate(false)
    const [modalActive,setModalActive]=useState(false)
    const [initialFetch,setInitialFetch]=useState(true)
    const [fetchIndicator,setFetchIndicator]=useState(false)
    const [instructors,setInstructors]=useState([])
    const [students,setStudents]=useState([])
    const [newStudentName,setNewStudentName]=useState("")
    const [emptyName,setEmptyName]=useState(false)
    const [studentAdded,setStudentAdded]=useState(false)
    const [addedStudentPassword,setAddedStudentPassword]=useState()
    const [addedStudentID,setAddedStudentID]=useState()
    const [department,setDepartment]=useState('Computer Science')
    const [instructorModalActive,setInstructorModalActive]=useState(false)
    const [newInstructorName,setNewInstructorName]=useState(false)
    const [instructorDepartment,setInstructorDepartment]=useState('Computer Science')
    const [instructorAdded,setInstructorAdded]=useState(false)
    const [newInstructor,setNewInstructor]=useState(false)
    const [dStudentList,setDStudentList]=useState([])
    const [dInstructorlist,setDInstructorList]=useState([])
    const [singleGuestModalActive,setSingleGuestModalActive]=useState(false)
    const [guestsModalActive,setGuestsModalActive]=useState(false)
    const [adminModalActive,setAdminModalActive]=useState(false)
    const [demosModalActive,setDemosModalActive]=useState(false)
    const [singleDemoModalActive,setSingleDemoModalActive]=useState(false)
    var deleteStudentsList=[]
    var deleteInstructorsList=[]

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
        fetch("http://localhost:8000/allInstructors",{
            method:"GET",
    headers:{'Content-type':'application/json'},
    }).then(res=>res.json()).then(res=>setInstructors(res))
    .then(fetch("http://localhost:8000/allStudents",{
        method:"GET",
headers:{'Content-type':'application/json'},
}).then(response=>response.json()).then(response=>setStudents(response)))
    .then(setFetchIndicator(true))
    }
    function addDeleteInstructor(e){
      deleteInstructorsList=dInstructorlist
      if(e.target.checked){
        deleteInstructorsList.push(e.target.value)
      }
      else{
        const instructorIndex=deleteInstructorsList.indexOf(e.target.vale)
        deleteInstructorsList.splice(instructorIndex,1)
      }
      console.log(deleteInstructorsList)
      setDInstructorList(deleteInstructorsList)
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
      function deleteInstructor(ID){
        fetch('http://localhost:8000/deleteInstructor',{
          method:"POST",
  headers:{'Content-type':'application/json'},
  body:JSON.stringify({ID:ID})
  }).then(res=>res.json()).then(res=>console.log(res)).then(setInitialFetch(true))
      }
    function deleteStudent(ID){
        console.log(ID)
        fetch('http://localhost:8000/deleteStudent',{
          method:"POST",
  headers:{'Content-type':'application/json'},
  body:JSON.stringify({ID:ID})
  }).then(res=>res.json()).then(res=>console.log(res)).then(setInitialFetch(true))
      }
      function deleteInstructor(ID){
        console.log(ID)
        fetch('http://localhost:8000/deleteInstructor',{
          method:"POST",
  headers:{'Content-type':'application/json'},
  body:JSON.stringify({ID:ID})
  }).then(res=>res.json()).then(res=>console.log(res)).then(setInitialFetch(true))
      }
    function resetPage(){
        setInitialFetch(true)
        setModalActive(false)
        setInstructorModalActive(false)
        setInstructorAdded(false)
        setStudentAdded(false)
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
    body:JSON.stringify({Name:newStudentName,Department:department})
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
    function deleteInstructors(){
      dInstructorlist.forEach(element=>{
        deleteInstructor(element)
      })
    }
    function deleteStudents(){
        dStudentList.forEach(element=>{
          deleteStudent(element)
        })
      }
      function logout(){
        localStorage.setItem('adminID','')
      localStorage.setItem('Department','')
      localStorage.setItem('StudentID','')
      navigate('/Login')
      }
    function addInstructor(){
        if(newInstructorName==""){
            setEmptyName(true)
        }
        else{
            setEmptyName(false)
            setInstructorAdded(false)
            fetch("http://localhost:8000/addInstructor",{
            method:"POST",
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({Name:newInstructorName,Department:instructorDepartment})
    }).then(res=>res.json()).then(response=>{
        console.log(response.ID)
        fetch("http://localhost:8000/instructorDetail",{
            method:"POST",
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({ID:response.ID})
    }).then(res=>res.json()).then(res=>{
        setNewInstructor({ID:response.ID,Name:newInstructorName,Password:res.Password})
    })
    .then(setInstructorAdded(true))

    })}}
    function departmentNavigate(department){
      localStorage.setItem('department',department)
      navigate('/department')
    }
    return (<div>
      <button onClick={logout} className="btn btn-sm btn-danger" style={{float:"right"}}>Log Out</button><h1>Super Admin Portal</h1><h4>Welcome {localStorage.getItem("superAdminID")}</h4>
      <div style={{float:"right"}}><button style={{marginRight:"10px"}} onClick={()=>(setAdminModalActive(true))} className="btn btn-md btn-dark">+Add Admin</button><button style={{marginRight:"10px"}} className="btn btn-md btn-dark">+Add Admins in Bulk</button></div>
    <div style={{float:"right"}}><button style={{marginRight:"10px"}} onClick={()=>(setInstructorModalActive(true))} className="btn btn-md btn-success">+Add Instructor</button><button style={{marginRight:"10px"}} className="btn btn-md btn-success">+Add Instructors in Bulk</button></div>
    <div style={{float:"right"}}><button style={{marginRight:"10px"}} onClick={()=>{setModalActive(true)}} className="btn btn-md btn-primary">+Add Student</button><button style={{marginRight:"10px"}} className="btn btn-md btn-primary">+Add Students in Bulk</button></div>
    <div style={{float:"right"}}><button style={{marginRight:"10px"}} onClick={()=>(setSingleGuestModalActive(true))} className="btn btn-md btn-info">+Add Guest Account</button><button onClick={()=>setGuestsModalActive(true)} style={{marginRight:"10px"}} className="btn btn-md btn-info">+Add Guests in Bulk</button></div>
    <div style={{float:"right"}}><button style={{marginRight:"10px"}} onClick={()=>(setSingleDemoModalActive(true))} className="btn btn-sm btn-info">+Add Demo Account</button><button onClick={()=>setDemosModalActive(true)} style={{marginRight:"10px"}} className="btn btn-sm btn-info">+Add Demo Accounts in Bulk</button></div>
    
    
    <Modal
    isOpen={modalActive}
    onRequestClose={modalActive}
    style={customStyles}>
        <div><h1>Add Student</h1></div>
        <div class="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" onChange={(e)=>setNewStudentName(e.target.value)} className="form-control" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" className="form-label">Department</label>
   <select onChange={(e)=>setDepartment(e.target.value)}>
    <option value="Computer Science">Computer Science</option>
    <option value="Mechanical">Mechanical</option>
    <option value="Aerospace">Aerospace</option>
   </select>
  </div>
  {emptyName && <div style={{color:"red"}}>Please Enter a Name</div>}
  {studentAdded && <table><tr><td style={{marginRight:"10px"}}>Name</td><td>{newStudentName}</td></tr>
  <tr><td style={{marginRight:"10px"}}>Password</td><td>{addedStudentPassword}</td></tr>
  <tr><td style={{marginRight:"10px"}}>ID</td><td>{addedStudentID}</td></tr>
  <tr style={{marginBottom:"10px"}}><td style={{marginRight:"10px"}}>Department</td><td>{department}</td></tr></table>}
  <button style={{marginRight:"10px"}} onClick={resetPage} className="btn btn-danger">Close</button>
  <button onClick={addStudent} className="btn btn-success">Add Student</button>
    </Modal>
    <Modal
    isOpen={instructorModalActive}
    onRequestClose={instructorModalActive}
    style={customStyles}>
        <div><h1>Add Instructor</h1></div>
        <div class="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" onChange={(e)=>setNewInstructorName(e.target.value)} className="form-control" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" className="form-label">Department</label>
   <select onChange={(e)=>setInstructorDepartment(e.target.value)}>
    <option value="Computer Science">Computer Science</option>
    <option value="Mechanical">Mechanical</option>
    <option value="Aerospace">Aerospace</option>
   </select>
  </div>
  {emptyName && <div style={{color:"red"}}>Please Enter a Name</div>}
  {instructorAdded && <table><tr><td style={{marginRight:"10px"}}>Name</td><td>{newInstructor.Name}</td></tr>
  <tr><td style={{marginRight:"10px"}}>Password</td><td>{newInstructor.Password}</td></tr>
  <tr><td style={{marginRight:"10px"}}>ID</td><td>{newInstructor.ID}</td></tr>
  <tr style={{marginBottom:"10px"}}><td style={{marginRight:"10px"}}>Department</td><td>{instructorDepartment}</td></tr></table>}
  <button style={{marginRight:"10px"}} onClick={resetPage} className="btn btn-danger">Close</button>
  <button onClick={addInstructor} className="btn btn-success">Add Instructor</button>
    </Modal>
    <h2 style={{float:"left"}}>Instructors</h2>
    <table className="table table-striped">
        <thead>
            <tr><td>Name</td><td>ID</td><td>Department</td><td>Delete</td></tr></thead>
    {fetchIndicator && instructors.map(element=>{
        return(<tr><td>{element.Name}</td>
        <td>{element.ID}</td>
        <td>{element.Department}</td>
        <td><input onChange={(e)=>{addDeleteInstructor(e)}} type="checkbox" value={element.ID}/></td>
        <td><button onClick={()=>{deleteInstructor(element.ID)}} className="btn btn-sm btn-danger">Delete</button></td></tr>)
    })
            }
            <tr><td></td><td></td><td></td><td><button onClick={deleteInstructors} className="btn btn-sm btn-danger">Delete Selected</button></td></tr>
            </table>
    <h2 style={{float:"left"}}>Students</h2>
    <table className="table table-striped">
        <thead>
            <tr><td>Name</td><td>ID</td><td>Department</td><td>Delete</td></tr></thead>
    {fetchIndicator && students.map(element=>{
        return(<tr><td>{element.Name}</td>
        <td>{element.ID}</td>
        <td>{element.Department}</td>
        <td><input onChange={(e)=>{addDeleteStudent(e)}} type="checkbox" value={element.ID}/></td>
        <td><button className="btn btn-sm btn-danger" onClick={()=>deleteStudent(element.ID)}>Delete</button></td></tr>)
    })
            }
            <tr><td></td><td></td><td></td><td><button onClick={deleteStudents} className="btn btn-sm btn-danger">Delete Selected</button></td></tr>
                </table>
            <h3 >Department</h3>
            <h5 >Add or Remove Courses According to Department</h5>
            <table>
                <tr><td><button onClick={()=>{departmentNavigate("Computer Science")}} className="btn btn-md btn-primary">Computer Science</button></td><td style={{marginRight:"5px"}}><button onClick={()=>{departmentNavigate("Aerospace")}} className="btn btn-md btn-success">Aerospace</button></td><td style={{marginRight:"5px"}}><button onClick={()=>{departmentNavigate("Mechanical")}} className="btn btn-md btn-info">Mechanical</button></td></tr>
            </table>

    
    </div>  );
}
 
export default SuperAdminPortal;
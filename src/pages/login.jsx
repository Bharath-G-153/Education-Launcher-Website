import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [userType,setuserType]=useState("Student")
    const [ID,setID]=useState("")
    const [password,setPassword]=useState("")
    const [invalidCredentials,setinvalidCredentials]=useState(false)
    const navigate=useNavigate(false)
    function handleSubmit(e){
        e.preventDefault();
        console.log(ID,password,userType)
        if(userType=="Student"){
        fetch('http://localhost:8000/studentLogin',{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({ID:ID,Password:password})}).then(res=>res.json()).then(res=>{
                if(res.validCredentials==false){
                    setinvalidCredentials(true)
                }
                else{
                  setinvalidCredentials(false)
                  localStorage.setItem('StudentID',ID)
                  console.log(res.Department)
                  localStorage.setItem('Department',res.Department)
                    console.log("Logged In Successfully")
                    navigate('/studentPortal')
                }
            }
            )}
            else if(userType=="Instructor"){
              fetch('http://localhost:8000/instructorLogin',{
    method:"POST",
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({ID:ID,Password:password})
}).then(response=>response.json()).then(response=>{
    if(response.validCredentials==true){
      localStorage.setItem('Department',response.Department)
      localStorage.setItem('InstructorID',ID)
      navigate('/instructorPortal')
    }
    else{
      setinvalidCredentials(true)
    }
            })
    }
  else if(userType=="Admin"){
    fetch('http://localhost:8000/adminLogin',{
      method:"POST",
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({ID:ID,Password:password})})
      .then(res=>res.json()).then(res=>{
        if(res.validCredentials==true){
          localStorage.setItem('adminID',ID)

          navigate('/adminPortal')
        }
        else{
          setinvalidCredentials(true)
        }
      })
  }
  else if(userType=="superAdmin"){
    fetch('http://localhost:8000/superAdminLogin',{
      method:"POST",
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({ID:ID,Password:password})})
      .then(res=>res.json()).then(res=>{
        if(res.validCredentials==true){
          localStorage.setItem('superAdminID',ID)
          navigate('/superAdminPortal')
        }
        else{
          setinvalidCredentials(true)
        }
      })
  }}
    return (<div>
        <h1 style={{fontFamily:"Roboto"}}>LOGIN</h1>
        <div className='login-background'>
        <form onSubmit={e=>{handleSubmit(e)}}>
  <div className="mb-3">
    <label className="form-label">ID</label>
    <input type="text" value={ID} required onChange={(e)=>setID(e.target.value)} className="form-control" id="ID" />
    </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" required className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1"/>
  </div>
  <label className='form-label'>User Type</label><br/>
  <span style={{marginTop:"5%"}}>  <input className="form-check-input" onChange={e=>setuserType(e.target.value)} value="Student" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked/>
  <label className="form-check-label gap" for="flexRadioDefault1">
    Student
  </label>
  <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={e=>setuserType(e.target.value)} value="Instructor" id="flexRadioDefault2"/>
  <label className="form-check-label gap" for="flexRadioDefault1">
    Instructor
  </label>
  <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={e=>setuserType(e.target.value)} value="Admin" id="flexRadioDefault3"/>
  <label className="form-check-label gap" for="flexRadioDefault1">
    Admin
  </label>
  <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={e=>setuserType(e.target.value)} value="superAdmin" id="flexRadioDefault3"/>
  <label className="form-check-label gap" for="flexRadioDefault1">
    Super Admin
  </label>
  <input className="form-check-input" type="radio" value="Guest" onChange={e=>setuserType(e.target.value)} name="flexRadioDefault" id="flexRadioDefault5"/>
  <label className="form-check-label gap" for="flexRadioDefault1">
    Guest
  </label></span><br/><br/>
  <button type="submit" className="btn btn-primary">Submit</button><br/><br/>
  {invalidCredentials && <div style={{color:"red",textAlign:"center"}}>Invalid Credentials<br/></div>}
</form></div>
    </div>);
}
 
export default Login;
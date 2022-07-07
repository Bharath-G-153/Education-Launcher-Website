import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const StudentPortal = () => {
    const navigate=useNavigate(false)
    const [initialData,setinitialData]=useState(true)
    const [studentCourseData,setstudentCourseData]=useState(false)
    const [courseName,setCourseName]=useState([])
    const [collectedNames,setCollectedNames]=useState([])
    const [nameIndicator,setNameIndicator]=useState(false)
    var names=[]
    var finalCourseList=[]
    if(initialData==true){
        setinitialData(false)
        fetch('http://localhost:8000/studentIncompletedCourses',{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({ID:localStorage.getItem('StudentID'),Completed:false})
        }).then(res=>res.json()).then(res=>{
            if(res.length==0){
                fetch('http://localhost:8000/fetchCourses',{
                        method:"POST",
                        headers:{'Content-type':'application/json'},
                        body:JSON.stringify({StudentID:localStorage.getItem('StudentID')})
                    }).then(res=>res.json()).then(response=>{
                        fetch('http://localhost:8000/allCourses',{
                            method:"GET",
                            headers:{'Content-type':'application/json'},
                        }).then(res=>res.json()).then(res=>{
                            console.log(res)
                            const assignedCourseIDS=response.map(value=>value.CourseID)
                            console.log(assignedCourseIDS)
                            const notAssignedCourses=res.filter(value=>!assignedCourseIDS.includes(value.CourseID))
                            notAssignedCourses.forEach(element => {
                                if(!assignedCourseIDS.includes(element.ID)){
                                    finalCourseList.push(element)
                                }
                                
                            });
                        }).then(result=>{
                            setCourseName(finalCourseList)
                            setNameIndicator(true)
                        })

                    })
            }
            else{

                console.log(res)
              setstudentCourseData(res)
              res.map((element)=>{
                fetch('http://localhost:8000/courseName',{
                    method:"POST",
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify({ID:element.CourseID})
                }).then(res=>res.json()).then(res=>{
                    names.push(res.Name)
                    console.log(names)
                    setCollectedNames(names)
                    })

              }).then(setNameIndicator(true))
            }})}
            function logOut(){
                localStorage.setItem('StudentID','')
                navigate('/Login')
                
            }
    function completeCourse(e){
        fetch('http://localhost:8000/completeCourse',{
            method:"POST",
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({StudentID:localStorage.getItem('StudentID'),CourseID:e,Department:localStorage.getItem('Department')})
        }).then(res=>res.json()).then(res=>{
            if(res.courseCompleted==true){
                setinitialData(true)
                console.log(res)
            }
        })

    }
    return (<div>
        <button className="btn btn-danger btn-sm" onClick={logOut} style={{float:"right"}}>Log Out</button>
        <h1>Student Portal</h1>
        <h6>Welcome {localStorage.getItem('StudentID')}</h6>
        <h8>Assigned Courses</h8>
        <table style={{marginTop:"5rem"}} className="table table-striped">
            <thead>
                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Download</th>
                    <th>Percentage Completed</th>
                </tr>
            </thead>
            <tbody>
                {courseName && nameIndicator && courseName.map((element)=>{
                    return(<tr>
                        <td>{element.ID}</td>
                        <td>{element.Name}</td>
                        <td><a target="_blank" onClick={(e)=>{completeCourse(element.ID)}} href="https://drive.google.com/file/d/18PlBvkwkKlWYjOcV19xdBwZSnPZvadN_/view?usp=sharing" download>Download</a></td>
                        <td>0</td>
                    </tr>)
                })}
                {studentCourseData && nameIndicator && studentCourseData.map((element,index)=>{
                    
                    return(<tr>
                        <td>{element.CourseID}</td>
                        <td>{collectedNames[index]}</td>
                        <td><a target="_blank" onClick={(e)=>{completeCourse(element.CourseID)}} href="https://drive.google.com/file/d/18PlBvkwkKlWYjOcV19xdBwZSnPZvadN_/view?usp=sharing" download>Download</a></td>
                        <td>0</td>
                    </tr>)
                })}
            </tbody>
        </table>

    </div>  );
}
 
export default StudentPortal;
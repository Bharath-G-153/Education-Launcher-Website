const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const { response } = require('express')
const { useInsertionEffect } = require('react')
const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
mongoose.connect("mongodb+srv://nobin:banglore@cluster0.mkk9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("Connected to db"))
const Schema=mongoose.Schema
const studentCourseSchema=new Schema({
    CourseID:{type:String,
    required:true},
    StudentID:{type:String,
    required:true},
    Department:{type:String,
    required:true},
    Completed:{type:Boolean,
    required:true,
    default:false}
})

const instructorSchema=new Schema({
    ID:{type:String,
        required:true,
    },
    Name:{type:String,
        required:true
    },
    Password:{type:String,
        required:true,
    },
    Department:{type:String,
    required:true}
})
const adminSchema=new Schema({
    ID:{type:String,
    required:true},
    Name:{type:String,
    required:true},
    Password:{type:String,
    required:true}
})
const studentSchema=new Schema({
    ID:{type:String,
        required:true
        
    },
    Name:{type:String,
        required:true,
    },
    Password:{type:String,
    },
    Department:{type:String,
    required:true}
})
const courseSchema=new Schema({
    Name:{type:String,
    required:true},
    ID:{type:String,
    required:true},
    Department:{required:true,
    type:String}
})
const superAdminSchema=new Schema({
    Name:{type:String,
    required:true},
    ID:{type:String,
    required:true}
})

const Course=mongoose.model('Course',courseSchema)
const Student=mongoose.model('Student',studentSchema)
const Instructor=mongoose.model('Instructor',instructorSchema)
const StudentCourse=mongoose.model('StudentCourse',studentCourseSchema)
const Admin=mongoose.model('Admin',adminSchema)
const superAdmin=mongoose.model('superAdmin',adminSchema)

app.post('/instructorLogin',async (req,res)=>{
    
    let result= await Instructor.findOne(req.body).then(response=>res.json({validCredentials:Boolean(response),Department:response.Department.toString()}))
})
app.post('/superAdminLogin',async(req,res)=>{
    await superAdmin.findOne(req.body).then(response=>res.json({validCredentials:Boolean(response)}))
})
app.post('/studentIncompletedCourses',(req,res)=>{
    StudentCourse.find({StudentID:req.body.ID,Completed:false},(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
})
app.post('/adminLogin',async (req,res)=>{
    await Admin.findOne(req.body).then(response=>res.json({validCredentials:Boolean(response)}))
})
app.post('/studentLogin',async (req,res)=>{
    
    let result= await Student.findOne(req.body).then(response=>res.json({Department:response.Department,validCredentials:Boolean(response)}))
})
app.get('/allInstructors',(req,res)=>{
    Instructor.find().then(response=>res.json(response))
})
app.get('/allStudents',(req,res)=>{
    Student.find().then(response=>res.json(response))
})
/*let superAdmin1=new superAdmin({Name:"Audrey Burgess",ID:"SA0001",Password:(Math.random()+1).toString(36).substring(2)})
let superAdmin2=new superAdmin({Name:"Tiffany Gardner",ID:"SA0002",Password:(Math.random()+1).toString(36).substring(2)})
let superAdmin3=new superAdmin({Name:"Les Wood",ID:"SA0003",Password:(Math.random()+1).toString(36).substring(2)})
let superAdmin4=new superAdmin({Name:"Benjamin Austin",ID:"SA0004",Password:(Math.random()+1).toString(36).substring(2)})
let superAdmin5=new superAdmin({Name:"Hattie Houle",ID:"SA0005",Password:(Math.random()+1).toString(36).substring(2)})
let superAdmin6=new superAdmin({Name:"Megan Nichols",ID:"SA0006",Password:(Math.random()+1).toString(36).substring(2)})
let superAdmin7=new superAdmin({Name:"Alexis Daniel",ID:"SA0007",Password:(Math.random()+1).toString(36).substring(2)})
let superAdmin8=new superAdmin({Name:"Webster Law",ID:"SA0008",Password:(Math.random()+1).toString(36).substring(2)})
let superAdmin9=new superAdmin({Name:"Anastasia Chambers",ID:"SA0009",Password:(Math.random()+1).toString(36).substring(2)})
let superAdmin10=new superAdmin({Name:"Hanley Boyd",ID:"SA0010",Password:(Math.random()+1).toString(36).substring(2)})
superAdmin1.save()
superAdmin2.save()
superAdmin3.save()
superAdmin4.save()
superAdmin5.save()
superAdmin6.save()
superAdmin7.save()
superAdmin8.save()
superAdmin9.save()
superAdmin10.save().then(console.log("saved admin accounts to to database"))
let admin1=new Admin({Name:"Dominic Robinett",ID:"AD0001",Password:(Math.random()+1).toString(36).substring(2)})
let admin2=new Admin({Name:"Ava Chavez",ID:"AD0002",Password:(Math.random()+1).toString(36).substring(2)})
let admin3=new Admin({Name:"Mia Gill",ID:"AD0003",Password:(Math.random()+1).toString(36).substring(2)})
let admin4=new Admin({Name:"Laurel Wheeler",ID:"AD0004",Password:(Math.random()+1).toString(36).substring(2)})
let admin5=new Admin({Name:"Robin Cox",ID:"AD0005",Password:(Math.random()+1).toString(36).substring(2)})
let admin6=new Admin({Name:"Barrett Freeman",ID:"AD0006",Password:(Math.random()+1).toString(36).substring(2)})
let admin7=new Admin({Name:"Roberta Ogley",ID:"AD0007",Password:(Math.random()+1).toString(36).substring(2)})
let admin8=new Admin({Name:"Wallace White",ID:"AD0008",Password:(Math.random()+1).toString(36).substring(2)})
let admin9=new Admin({Name:"Elmer Fisher",ID:"AD0009",Password:(Math.random()+1).toString(36).substring(2)})
let admin10=new Admin({Name:"Thelma Hodges",ID:"AD0010",Password:(Math.random()+1).toString(36).substring(2)})
admin1.save()
admin2.save()
admin3.save()
admin4.save()
admin5.save()
admin6.save()
admin7.save()
admin8.save()
admin9.save()
admin10.save().then(console.log("saved to database"))
*/
/*
let course1=new Course({Name:"Introduction to Blockchain Development",ID:"CO0001",Department:"Computer Science"})
let course2=new Course({Name:"Introduction to Machine Learning and Artificial Intelligence",ID:"CO0002",Department:"Computer Science"})
let course3=new Course({Name:"Computer Programming for Beginners",ID:"CO0003",Department:"Computer Science"})
let course4=new Course({Name:"Introduction to Java and Algorithms",ID:"CO0004",Department:"Computer Science"})
let course5=new Course({Name:"Operating Systems and Computer Networking",ID:"CO0005",Department:"Computer Science"})
let course6=new Course({Name:"Web Development for Beginners",ID:"CO0006",Department:"Computer Science"})
let course7=new Course({Name:"Bash Scripting and Shell Programming",ID:"CO0007",Department:"Computer Science"})
let course8=new Course({Name:"The Complete Cybersecurity Course",ID:"CO0008",Department:"Computer Science"})
let course9=new Course({Name:"Complete C# Unity Game Development course",ID:"CO0009",Department:"Electronics and Communication"})
let course10=new Course({Name:"A Complete guide for Android Development",ID:"CO0010",Department:"Electronics and Communication"})
let course11=new Course({Name:"Verilog VLSI Hardware Design Essential Course",ID:"CO0011",Department:"Electronics and Communication"})
let course12=new Course({Name:"A Simple Introduction to Digital Signal Processing",ID:"CO0012",Department:"Electronics and Communication"})
let course13=new Course({Name:"Microcontroller Architecture and Embedded C Programming",ID:"CO0013",Department:"Electronics and Communication"})
let course14=new Course({Name:"Control Systems and Mathematical modelling",ID:"CO0014",Department:"Electronics and Communication"})
let course15=new Course({Name:"Introduction to Analog , Digital Communications and Network Theory",ID:"CO0015",Department:"Electronics and Communication"})
let course16=new Course({Name:"Introductory course on Antennas for wireless communication",ID:"CO0016",Department:"Electronics and Communication"})
let course17=new Course({Name:"Introduction to Process control and Instrumentation",ID:"CO0017",Department:"Electronics and Communication"})
let course18=new Course({Name:"Introduction to Semiconductor Devices",ID:"CO0018",Department:"Electronics and Communication"})
let course19=new Course({Name:"The Complete Course on Analog Hardware Design and PCB Design",ID:"CO0019",Department:"Electronics and Communication"})
let course20=new Course({Name:"Computer Networks for Beginners",ID:"CO0020",Department:"Electronics and Communication"})
let course21=new Course({Name:"Fundamentals of Engineering Thermodynamics",ID:"CO0021",Department:"Mechanical"})
let course22=new Course({Name:"Fundamentals of Fluid Mechanics",ID:"CO0022",Department:"Mechanical"})
let course23=new Course({Name:"Introduction to Computational Fluid Dynamics and Simulation",ID:"CO0023",Department:"Mechanical"})
let course24=new Course({Name:"CAD and 3D Modelling for Beginners",ID:"CO0024",Department:"Mechanical"})
let course25=new Course({Name:"The Complete Course on Additive Manufacturing and 3D Printing",ID:"CO0025",Department:"Mechanical"})
let course26=new Course({Name:"Fundamentals of Machine Design",ID:"CO0026",Department:"Mechanical"})
let course27=new Course({Name:"Introductory Course on Industrial Hydraulics and Pneumatics",ID:"CO0027",Department:"Mechanical"})
let course28=new Course({Name:"Fundamentals of Industry 5.0",ID:"CO0028",Department:"Mechanical"})
let course29=new Course({Name:"Overview into Manufacturing Process – Foundry &amp; Forging",ID:"CO0029",Department:"Mechanical"})
let course30=new Course({Name:"Introduction to Material Science and Material Processing",ID:"CO0030",Department:"Mechanical"})
course1.save()
course2.save()
course3.save()
course4.save()
course5.save()
course6.save()
course7.save()
course8.save()
course9.save()
course10.save()
course11.save()
course12.save()
course13.save()
course14.save()
course15.save()
course16.save()
course17.save()
course18.save()
course19.save()
course20.save()
course21.save()
course22.save()
course23.save()
course24.save()
course25.save()
course26.save()
course27.save()
course28.save()
course29.save()
course30.save()
*/

app.post('/instructor_student_details',async (req,res)=>{
Student.find({Department:req.body.department},(error,data)=>{
    if (error){
        console.log(error)
    }
    else{
        res.send(data)
    }
})
})
app.post('/deleteStudent',(req,res)=>{
    console.log(req.body)
    Student.deleteOne({ID:req.body.ID}).then(res=>console.log(res))
    StudentCourse.deleteMany({ID:req.body.ID}).then(res.json({StudentDeleted:true}))
})
app.post('/deleteInstructor',(req,res)=>{
    console.log(req.body)
    Instructor.deleteOne({ID:req.body.ID}).then(res=>console.log(res))

})
app.get('/allCourses',(req,res)=>{
    Course.find({},(error,data)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(data)
        }
    })
})
app.post('/studentDetail',(req,res)=>{
    console.log("line 166:" +req.body.ID)
    Student.findOne({ID:req.body.ID}).then(response=>res.json({Password:response.Password}))
})
app.post('/instructorDetail',(req,res)=>{
    console.log("line 166:" +req.body.ID)
    Instructor.findOne({ID:req.body.ID}).then(response=>res.json({Password:response.Password}))
})
app.post('/fetchCourseList',(req,res)=>{
    Course.find(req.body,(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
})
app.post('/fetchCourses',(req,res)=>{
    StudentCourse.find(req.body,(error,data)=>{
        if(error){
            console.log(error)}
        else{
            console.log(data)
            res.send(data)
        }
    })
})
app.post('/addCourse',(req,res)=>{
    console.log(req.body)
    let studentCourse=new StudentCourse(req.body)
    studentCourse.save()
    res.json({})
})
app.post('/studentInfo',(req,res)=>{
    console.log(req.body)
    Student.findOne(req.body).then(response=>res.json({ID:response.ID,Name:response.Name}))
})
app.post('/completeCourse',(req,res)=>{
    console.log(req.body)
    StudentCourse.deleteOne({StudentID:req.body.StudentID,CourseID:req.body.CourseID,Completed:false}).then(res=>{console.log(res)})
    var studentCourse=new StudentCourse({StudentID:req.body.StudentID,CourseID:req.body.CourseID,Completed:true,Department:req.body.Department})
    studentCourse.save().then(res.json({courseCompleted:true}))
})
app.post('/courseName',async (req,res)=>{
     await Course.findOne(req.body).then(response=>{
        console.log(response)
        res.json(response)})
})
app.post('/deleteCourse',(req,res)=>{
    StudentCourse.deleteOne(req.body).then(res.json({}))
})
app.post('/removeCourse',(req,res)=>{
    console.log(req.body)
    Course.deleteOne(req.body).then(response=>console.log(response))
})
app.post('/instructorAddStudent',async (req,res)=>{
    let id
    Student.countDocuments({},(err,countDocuments)=>{
        console.log(countDocuments)
        console.log(req.body.Name)
        ++countDocuments
        if(countDocuments.toString().length==1){
            id="ST000"+countDocuments.toString()
            var newStudent=new Student({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newStudent.save()
            res.json({ID:id})
        }
        else if(countDocuments.toString().length==2){
            id="ST00"+countDocuments.toString()
  
            var newStudent=new Student({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newStudent.save()
            res.json({ID:id})
        }
        else if(countDocuments.toString().length==3){
            id="ST0"+countDocuments.toString()
            var newStudent=new Student({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newStudent.save()
            res.json({ID:id})
        }
        else if(countDocuments.toString().length==4){
            id="ST"+countDocuments.toString()
            var newStudent=new Student({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newStudent.save()
            res.json({ID:id})
        }
        })
        console.log(id)
    
    
})
app.post('/addInstructor',async (req,res)=>{
    let id
    Instructor.countDocuments({},(err,countDocuments)=>{
        console.log(countDocuments)
        console.log(req.body.Name)
        ++countDocuments
        if(countDocuments.toString().length==1){
            id="IR000"+countDocuments.toString()
            var newStudent=new Instructor({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newStudent.save()
            res.json({ID:id})
        }
        else if(countDocuments.toString().length==2){
            id="IR00"+countDocuments.toString()
  
            var newStudent=new Instructor({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newStudent.save()
            res.json({ID:id})
        }
        else if(countDocuments.toString().length==3){
            id="IR0"+countDocuments.toString()
            var newStudent=new Instructor({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newStudent.save()
            res.json({ID:id})
        }
        else if(countDocuments.toString().length==4){
            id="IR"+countDocuments.toString()
            var newStudent=new Instructor({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newStudent.save()
            res.json({ID:id})
        }
        })
        console.log(id)
    
    
})
app.post('/addDepartmentCourse',async (req,res)=>{
    let id
    Course.countDocuments({},(err,countDocuments)=>{
        console.log(countDocuments)
        console.log(req.body.Name)
        ++countDocuments
        if(countDocuments.toString().length==1){
            id="CO000"+countDocuments.toString()
            var newCourse=new Course({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newCourse.save()
            res.json({ID:id})
        }
        else if(countDocuments.toString().length==2){
            id="CO00"+countDocuments.toString()
  
            var newCourse=new Course({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newCourse.save()
            res.json({ID:id})
        }
        else if(countDocuments.toString().length==3){
            id="CO0"+countDocuments.toString()
            var newCourse=new Course({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newCourse.save()
            res.json({ID:id})
        }
        else if(countDocuments.toString().length==4){
            id="CO"+countDocuments.toString()
            var newCourse=new Course({ID:id,Name:req.body.Name,Password:(Math.random()+1).toString(36).substring(2),Department:req.body.Department})
            newCourse.save()
            res.json({ID:id})
        }
        })
        console.log(id)
    
    
})
app.listen(8000,()=>console.log("listening on port 8000"))


import Login from './pages/login';
import StudentPortal from './pages/studentPortal'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import InstructorPortal from './pages/instructorPortal';
import StudentInfo from './pages/studentInfo';
import AdminPortal from './pages/adminPortal';
import Department from './pages/department';
import './App.css'
import SuperAdminPortal from './pages/superAdminPortal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path='/Login' element={<Login/>}/>
      <Route exact path='/studentPortal' element={<StudentPortal/>}/>
      <Route exact path='/instructorPortal' element={<InstructorPortal/>}/>
      <Route exact path='/studentInfo' element={<StudentInfo/>}/>
      <Route exact path='/adminPortal' element={<AdminPortal/>}/>
      <Route exact path='/department' element={<Department/>}/>
      <Route exact path='/superAdminPortal' element={<SuperAdminPortal/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

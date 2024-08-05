/* eslint-disable no-unused-vars */
import { Routes, Route } from 'react-router-dom';
import IndexPage from "./pages/main-pages/indexPage";
import LoginPage from './pages/main-pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/main-pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './pages/main-pages/AccountPage';
import EmployeesPage from './pages/main-pages/EmployeesPage';
import DepartmentsPage from './pages/main-pages/DepartmentsPage';
import ShiftsPage from './pages/main-pages/ShiftsPage';
import UsersPage from './pages/main-pages/UsersPage';
import EditEmployeePage from './pages/Add&Edit-pages/Edit-EmployeePage';
import NewEmployeePage from './pages/Add&Edit-pages/New-EmployeePage';
import EditDepartmentPage from './pages/Add&Edit-pages/Edit-DepartmentPage';
import AddDepartmentPage from './pages/Add&Edit-pages/Add-DepartmentPage';
import Crm from './pages/main-pages/Crm';
import AddCompanyPage from './pages/Add&Edit-pages/Add-CompanyPage';
import AddUserPage from './pages/Add&Edit-pages/Add-userPage';
import EditCompanyPage from './pages/Add&Edit-pages/Edit-CompanyPage';
import TasksApp from './components/Tasks/Tasks-App';
import DocumentManagementPage from './pages/main-pages/Documents/DocumentManagementPage';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/employees' element={<EmployeesPage />} />
          <Route path='/employees/:companyId' element={<EmployeesPage />} />
          <Route path='/departments' element={<DepartmentsPage />} />
          <Route path='/departments/:companyId' element={<DepartmentsPage />} />
          <Route path='/edit-department/:id' element={<EditDepartmentPage />} />
          <Route path='/add-department' element={<AddDepartmentPage />} />
          <Route path='/add-department/:companyId' element={<AddDepartmentPage />} />
          <Route path='/shifts' element={<ShiftsPage />} />
          <Route path='/shifts/:companyId' element={<ShiftsPage />} />
          <Route path='/crm' element={<Crm />} />
          <Route path='/add-company' element={<AddCompanyPage />} />
          <Route path='/edit-company/:id' element={<EditCompanyPage />} />
          <Route path='/users' element={<UsersPage/>} />
          <Route path='/users/:companyId' element={<UsersPage/>} />
          <Route path='/edit-employee/:employeeId' element={<EditEmployeePage />} />
          <Route path='/add-employee' element={<NewEmployeePage />} />
          <Route path='/add-user/:companyId' element={<AddUserPage />} />
        </Route>
          <Route path='/taskApp' element={<TasksApp />} />
          <Route path='/documents' element={<DocumentManagementPage />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App

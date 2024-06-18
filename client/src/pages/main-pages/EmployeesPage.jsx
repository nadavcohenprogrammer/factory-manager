import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { fetchData } from '../../services/utils';
import SidebarItem from '../../components/Sidebar/SidebarItem';

const EmployeesPage = () => {
  const { user } = useContext(UserContext);
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    const refreshData = async () => {
      let allShifts = [];
      let allEmployees = [];
      const departmentsData = await fetchData(`/companies/company/departments/${user.chosenCompany._id}`);
      setDepartments(departmentsData.department);
      for (const department of departmentsData.department) {
        const shiftsData = await fetchData(`/shifts/shifts/${department._id}`);
        allShifts = [...allShifts, ...shiftsData];
        const employeesData = await fetchData(`/employees/employees/${department._id}`);
        allEmployees = [...allEmployees, ...employeesData];
      }
      setShifts(allShifts);
      setEmployees(allEmployees);
    };
    if (user) refreshData();
  }, [user]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const filteredEmployees = selectedDepartment
    ? employees.filter((emp) => emp.department?._id === selectedDepartment)
    : employees;

  return (
    <div className='flex'>
      <SidebarItem />
      <div className='flex-grow'>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold mb-4 text-center">Employees</h1>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <Link
              to="/add-employee"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0"
            >
              New Employee
            </Link>
            <select
              className="ml-4 md:ml-0 px-2 py-1 border border-gray-300 rounded"
              onChange={handleDepartmentChange}
            >
              <option value="">All Departments</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEmployees.map((employee) => (
              <div key={employee._id} className="bg-white rounded-md shadow p-4 overflow-hidden hover:overflow-auto min-h-28 max-h-96">
                <h2 className="text-lg text-white font-semibold text-center bg-yellow-400 rounded-tl-lg rounded-tr-lg mb-4">
                  {employee.firstName} - {employee.lastName}
                </h2>
                {shifts
                  .filter((shift) => shift.employees?.some((emp) => emp._id === employee._id))
                  .map((shift) => (
                    <div key={shift._id} className="bg-white rounded-md shadow p-4 mb-2">
                      <h3 className="text-sm font-medium mb-2">{shift.date}</h3>
                      <p className="text-xs text-gray-500 mb-2">{shift.startingHour} - {shift.endingHour}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-md text-gray-500">{employee.department && employee.department.name}</span>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;

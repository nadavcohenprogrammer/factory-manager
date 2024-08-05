/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../../services/utils";
import TableRows from "../../components/TableRows";
import LoadingBanner from "../../components/LoadingBanner";

const DepartmentPage = () => {
  const { companyId } = useParams();
  const [departments, setDepartments] = useState([]);
  const [employeesWithShifts, setEmployeesWithShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(''); // State to hold selected department
  const [filteredEmployees, setFilteredEmployees] = useState([]); // State for filtered employees

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const departmentsData = await fetchData(`/companies/company/departments/${companyId}`);
      setDepartments(departmentsData.department);
      let allEmployees = [];
      let allShifts = [];
      for (const department of departmentsData.department) {
        const employeesData = await fetchData(`/employees/employees/${department._id}`);
        allEmployees = [...allEmployees, ...employeesData];
        const shiftsData = await fetchData(`/shifts/shifts/${department._id}`);
        allShifts = [...allShifts, ...shiftsData];
      }
      const updatedEmployees = allEmployees.map(employee => {
        const shiftsForEmployee = allShifts.filter(shift => shift.employees?.some(emp => emp._id === employee._id));
        return { ...employee, shifts: shiftsForEmployee };
      });
      setEmployeesWithShifts(updatedEmployees);
      setFilteredEmployees(updatedEmployees); // Set filtered employees initially to all employees
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Handle department change for filtering employees
  const handleDepartmentChange = useCallback((event) => {
    const departmentId = event.target.value;
    setSelectedDepartment(departmentId);
    if (departmentId === '') {
      setFilteredEmployees(employeesWithShifts); // If no department is selected, show all employees
    } else {
      setFilteredEmployees(employeesWithShifts.filter(employee => employee.department?._id === departmentId));
    }
  }, [employeesWithShifts]);

  const renderDepartments = useMemo(() => {
    return departments.map((department) => (
      <div key={department._id} className="p-4 mt-6">
        <Link to={`/edit-department/${department._id}`} className="rounded-md border w-fit p-2 text-lg font-semibold">
          {department.name}
        </Link>
        <table className="w-full text-center mt-1 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 rounded-tl-lg">Manager Name</th>
              <th className="p-2">Employee Name</th>
              <th className="p-2 rounded-tr-lg">Shifts</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              employee.department?._id === department._id && (
                <TableRows
                  key={employee._id}
                  employee={employee}
                  department={department}
                />
              )
            ))}
          </tbody>
        </table>
      </div>
    ));
  }, [departments, filteredEmployees]);

  return (
    <div className="flex flex-col">
      {loading && <LoadingBanner />}
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4 mt-4 text-center">Departments</h1>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <Link
            to={`/add-department/${companyId}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-4 rounded"
          >
            New Department
          </Link>
        <select
          className="mr-4- md:mr-5 px-2 py-1 border border-gray-300 rounded"
          value={selectedDepartment}
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
        {renderDepartments}
      </div>
    </div>
  );
};

export default DepartmentPage;
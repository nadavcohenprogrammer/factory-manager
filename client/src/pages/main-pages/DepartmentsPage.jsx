import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchData } from "../../services/utils";
import TableRows from "../../components/TableRows";
import SidebarItem from "../../components/Sidebar/SidebarItem";

const DepartmentPage = () => {
  const { companyId } = useParams();
  const [departments, setDepartments] = useState([]);
  const [employeesWithShifts, setEmployeesWithShifts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const departmentsData = await fetchData(`/companies/company/departments/${companyId}`);
        setDepartments(departmentsData.department);
        let allEmployees = [];
        let allShifts = [];
        for (const department of departmentsData.department) {
          try {
            const employeesData = await fetchData(`/employees/employees/${department._id}`);
            allEmployees = [...allEmployees, ...employeesData];
            const shiftsData = await fetchData(`/shifts/shifts/${department._id}`);
            allShifts = [...allShifts, ...shiftsData];
          } catch (error) {
            console.error(`Error fetching data for department ${department._id}:`, error);
          }
        }
        const updatedEmployees = allEmployees.map(employee => {
          const shiftsForEmployee = allShifts.filter(shift => shift.employees?.some(emp => emp._id === employee._id));
          return { ...employee, shifts: shiftsForEmployee };
        });
        setEmployeesWithShifts(updatedEmployees);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [companyId]);

  return (
    <div className="flex">
      <SidebarItem />
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4 mt-4 text-center">Departments</h1>
        <div className="mt-4 mb-4">
          <Link
            to={`/add-department/${companyId}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-4 py-2 px-4 rounded"
          >
            New Department
          </Link>
        </div>
        {departments.map((department) => (
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
                {employeesWithShifts.map((employee) => (
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
        ))}
      </div>
    </div>
  );
};

export default DepartmentPage;

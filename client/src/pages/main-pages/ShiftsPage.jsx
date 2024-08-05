/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { fetchData, postData } from "../../services/utils";
import ConfirmMessage from "../../confirm-messagePage";
import LoadingBanner from "../../components/LoadingBanner";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ShiftForm from './shifts/ShiftForm';
import ShiftTable from './shifts/ShiftTable';
import EmployeeSelectModal from './shifts/EmployeeSelectModal';

const localizer = momentLocalizer(moment);

function ShiftsPage() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [shiftBar, setShiftBar] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectDepartment, setSelectDepartment] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [newShift, setNewShift] = useState({ date: "", startingHour: "", endingHour: "" });
  const [dialog, setDialog] = useState({ message: "", isLoading: false, handleCancel: false });
  const [calendarView, setCalendarView] = useState(false);
  const [filteredShifts, setFilteredShifts] = useState([]);

  // Fetch data when the component mounts or when user or location.search changes
  useEffect(() => {
    const refreshData = async () => {
      if (!user?.chosenCompany?._id) return;
      setLoading(true);
      try {
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
        setFilteredShifts(allShifts); // Set filteredShifts initially to all shifts
        setEmployees(allEmployees);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    refreshData();

    // Check query parameter to open calendar view
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('view') === 'calendar') {
      setCalendarView(true);
    }

  }, [user, location.search]);

  const handleDepartmentChange = useCallback((event) => {
    const departmentId = event.target.value;
    setSelectDepartment(departmentId);
    // Filter shifts based on the selected department
    if (departmentId === '') {
      setFilteredShifts(shifts); // If no department selected, show all shifts
    } else {
      setFilteredShifts(shifts.filter(shift => shift.department._id === departmentId));
    }
  }, [shifts]);

  // Toggle between calendar and table views
  const toggleCalendarView = useCallback(() => {
    setCalendarView(!calendarView);
  }, [calendarView]);

  // Handle shift creation
  const handleCreateShift = useCallback(async () => {
    if (!selectDepartment) {
      setDialog({ message: "Please select a department", isLoading: true, handleCancel: false });
      return;
    } else if (!newShift.date || !newShift.endingHour || !newShift.startingHour) {
      setDialog({ message: "Please fill out all shift details", isLoading: true, handleCancel: false });
      return;
    }
    try {
      setLoading(true);
      await postData("/shifts/add-shift", { selectDepartment, newShift });
      setSelectDepartment('');
      setNewShift({ date: "", startingHour: "", endingHour: "" });
      // Refresh shifts data
      const departmentsData = await fetchData(`/companies/company/departments/${user.chosenCompany._id}`);
      let allShifts = [];
      for (const department of departmentsData.department) {
        const shiftsData = await fetchData(`/shifts/shifts/${department._id}`);
        allShifts = [...allShifts, ...shiftsData];
      }
      setShifts(allShifts);
      setFilteredShifts(allShifts); // Update filtered shifts
      setDialog({ message: "Shift Created Successfully. Now you can add employees.", isLoading: true, handleCancel: false });
    } catch (error) {
      setDialog({ message: "Failed to create shift. Please try again.", isLoading: true, handleCancel: false });
      console.error("Error creating shift:", error);
    } finally {
      setLoading(false);
    }
  }, [selectDepartment, newShift, user]);

  // Handle adding an employee to a shift
  const handleAddEmployee = useCallback((shift) => {
    setSelectedShift(shift);
    setShowSelect(true);
  }, []);

  // Handle selecting an employee to add to a shift
  const handleSelectEmployee = useCallback(async (event) => {
    const employeeId = event.target.value;
    setEmployeeId(employeeId);
    const selectedEmployee = employees.find(emp => emp._id === employeeId);
    if (selectedShift.employees.some(emp => emp._id === employeeId)) {
      setDialog({ message: `${selectedEmployee.firstName} is already assigned to this shift.`, isLoading: true, handleCancel: false });
    } else if (selectedEmployee.department._id !== selectedShift.department._id) {
      setDialog({ message: `${selectedEmployee.firstName} is not part of the selected department.`, isLoading: true, handleCancel: true });
    } else {
      try {
        await postData(`/shifts/add-employee/${selectedShift._id}`, { employeeId });
        setShifts(prevShifts =>
          prevShifts.map(shift =>
            shift._id === selectedShift._id
              ? { ...shift, employees: [...shift.employees, selectedEmployee] }
              : shift
          )
        );
        setFilteredShifts(prevShifts =>
          prevShifts.map(shift =>
            shift._id === selectedShift._id
              ? { ...shift, employees: [...shift.employees, selectedEmployee] }
              : shift
          )
        );
        setDialog({ message: `${selectedEmployee.firstName} added successfully.`, isLoading: true, handleCancel: false });
      } catch (error) {
        console.error("Error adding employee to shift:", error);
      }
    }
  }, [selectedShift, employees]);

  // Toggle the shift creation form visibility
  const openCreateShiftBar = useCallback(() => {
    if (departments.length <= 0) {
      alert("No departments available. Please create departments first.");
      setShiftBar(false);
    } else {
      setShiftBar(!shiftBar);
    }
  }, [departments.length, shiftBar]);

  // Handle confirmation dialog actions
  const handleConfirmation = useCallback((choose) => {
    if (choose && dialog.handleCancel) {
      // Implement logic if necessary
      setShowSelect(false);
    } else {
      setDialog({ message: "", isLoading: false, handleCancel: false });
    }
  }, [dialog]);

  return (
    <div className="flex flex-col lg:flex-row">
      {loading && <LoadingBanner />}
      <div className="flex-grow">
        <div className="container mx-auto mt-8">
          <h1 className="text-3xl text-center font-bold mb-4">Shifts</h1>
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleCalendarView}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {calendarView ? "View Shifts Table" : "View Calendar"}
            </button>
          </div>
          <select
            className="ml-4 md:ml-0 mb-1 px-2 py-1 border border-gray-300 rounded"
            value={selectDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="">All Departments</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
          {calendarView ? (
            <Calendar
              localizer={localizer}
              events={filteredShifts.map(shift => ({
                title: `${shift.department.name} Shift`,
                start: new Date(shift.date + ' ' + shift.startingHour),
                end: new Date(shift.date + ' ' + shift.endingHour),
                resource: shift
              }))}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              draggable
            />
          ) : (
            <>
              <ShiftForm
                departments={departments}
                newShift={newShift}
                setNewShift={setNewShift}
                handleCreateShift={handleCreateShift}
                openCreateShiftBar={openCreateShiftBar}
                shiftBar={shiftBar}
                // handleSelectDepartment={handleSelectDepartment}
              />
              <ShiftTable
                shifts={filteredShifts}
                handleAddEmployee={handleAddEmployee}
              />
            </>
          )}

          {showSelect && (
            <EmployeeSelectModal
              employees={employees}
              handleSelectEmployee={handleSelectEmployee}
              setShowSelect={setShowSelect}
            />
          )}

          {dialog.isLoading && (
            <ConfirmMessage
              onDialog={handleConfirmation}
              message={dialog.message}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ShiftsPage;
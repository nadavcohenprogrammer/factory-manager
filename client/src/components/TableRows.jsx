/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const TableRows = ({ employee, department }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className="cursor-pointer ">
        {employee.department?.manager ? (
          <td className={`py-2 px-3 font-normal text-base border-t whitespace-nowrap shadow-md rounded-b-lg`}>
            <Link>
              {employee.department.manager.firstName} - {employee.department.manager.lastName}
            </Link>
          </td>
        ) : (
          <td className={`py-2 px-3 font-normal text-base border-t whitespace-nowrap`}>
            <Link
              className="text-red-500 hover:underline hover:text-blue-400"
              title="Click To Add Manager Now"
              to={`/edit-department/${employee.department._id}`}
            >
              {`No manager assigned to ${employee.department.name}`}
            </Link>
          </td>
        )}
        <td className={`py-2 px-3 font-normal text-base border-t whitespace-nowrap shadow-md`}>
          <Link to={`/edit-employee/${employee?._id}`}>
            {employee?.firstName} - {employee?.lastName}
          </Link>
        </td>
        <td onClick={() => setOpen(!open)} className={`py-5 px-3 text-base hover:bg-slate-400  font-normal border-t shadow-md rounded-b-lg`}>
          <button type="button" >View Shifts
            <svg
              className={`text-black w-6 h-6 z-40  ${open ? "rotate-0" : "rotate-180"
                }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.25 4.5A.75.75 0 0 1 3 3.75h14.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm14.47 3.97a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 1 1-1.06 1.06L18 10.81V21a.75.75 0 0 1-1.5 0V10.81l-2.47 2.47a.75.75 0 1 1-1.06-1.06l3.75-3.75ZM2.25 9A.75.75 0 0 1 3 8.25h9.75a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 9Zm0 4.5a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd" />
            </svg>
          </button>
        </td>
      </tr>
      <tr>
        <td colSpan={6} className="pl-10">
          <h1 className={`text-xl ${open ? "block" : "hidden"}`}>Shifts</h1>
        </td>
      </tr>
      <tr
        className={`w-full overflow-hidden transition-[max-height] delay-1000 duration-1000 ease-in-out  ${open ? "max-h-20" : "max-h-0"
          }`}  >

        <td colSpan={10}>
          <table
            className={`px-10 w-fit  ${open ? "block" : "hidden"} mx-auto`}
          >
            <thead className="bg-[#222E3A]/[6%] rounded-xl text-base  text-white font-semibold w-full">
              <tr>
              <th className="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-l-lg">
                Date
              </th>
              <th className="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap">
                Starts At
              </th>
              <th className="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-r-lg">
                Ending At
              </th>
              </tr>
            </thead>
            <tbody>
              {employee && employee.shifts?.map((shift) => (
                <tr key={shift._id}>
                  <td className="py-3 px-4">{shift.date}</td>
                  <td className="py-3 px-4">{shift.startingHour}</td>
                  <td className="py-3 px-4 text-center">{shift.endingHour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>

    </>
  );
};

export default TableRows;

const express = require("express");
const router = express.Router();
// const {isNotAssignToDepart} = require ("../validations/employee-validations")

const {
  creatNewShift,
  getShiftsRelatadeToDepartment,
  getShifts,
  getShiftById,
  updateShiftById,
  unassignEmployeeFromShift,
  assignEmployeeToShift,
  deleteShiftById,
} = require("../services-BL/shift-service");
const { isAuthenticated, trackUserActions } = require("../validations/user-validations");
const { BsController } = require("react-icons/bs");

const serverErrorResponse = (res) => {
  res.status(500).json({
    error: "server error",
  });
};

router.get("/shifts", async (req, res) => {
  try {
    const shifts = await getShifts();
    res.json( shifts );
  } catch (err) {
    serverErrorResponse(res);
  }
});

router.get("/shifts/:departmentId",isAuthenticated,trackUserActions, async (req, res) => {
  try {
    const { departmentId} = req.params;
    const shifts = await getShiftsRelatadeToDepartment(departmentId);
    res.json( shifts );
  } catch (err) {
    serverErrorResponse(res);
  }
});

router.get("/shift/:id",isAuthenticated,trackUserActions, async (req, res) => {
  try {
    const {id}  = req.params;
    const shift = await getShiftById(id);
    res.json( shift );
  } catch (err) {
    serverErrorResponse(res);
  }
});

router.post("/add-shift",isAuthenticated,trackUserActions, async (req, res) => {
  try {
    console.log("Controller")
    const {selectDepartmen,newShift}  = req.body;
    const shift = await creatNewShift(selectDepartmen,newShift);
    res.json( shift );
  } catch (err) {
    serverErrorResponse(res);
  }
});

router.post("/edit-shift/:id",isAuthenticated,trackUserActions, async (req, res) => {
  try {
    const { id } = req.params;
    const { newData } = req.body;
    const shift = await updateShiftById(id,newData);
    res.json( shift );
  } catch (err) {
    serverErrorResponse(res);
  }
});

router.post("/delete-shift/:id",isAuthenticated,trackUserActions, async (req, res) => {
  const {id} = req.params
  try {
     await deleteShiftById(id);
    res.json( {message:'shift deleted successfully'} );
  } catch (err) {
    serverErrorResponse(res);
  }
});

router.post("/add-employee/:shiftId",isAuthenticated,trackUserActions, async (req, res) => {
  const {shiftId} = req.params
  const {employeeId} = req.body;
  try {
     const emplo =await assignEmployeeToShift(shiftId,employeeId);
     console.log(emplo)
    res.json( {message:'good'} );
  } catch (err) {
    serverErrorResponse(res);
  }
});

router.post("/delete-employee/:shiftId",isAuthenticated,trackUserActions, async (req, res) => {
  const {shiftId} = req.params
  const {employeeId} = req.body;
  try {
     await unassignEmployeeFromShift(shiftId,employeeId);
    res.json( {message:'Unassign Employee From Shift'} );
  } catch (err) {
    serverErrorResponse(res);
  }
});


module.exports = router;

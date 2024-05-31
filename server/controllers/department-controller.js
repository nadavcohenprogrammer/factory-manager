const express = require("express");
const router = express.Router();
const {
  getDepartments,
  createNewDepartment,
  updateDepartmentById,
  deleteDepartmentById,
  getDepartmentById,
} = require("../services-BL/departement-service");

const { trackUserActions, isValidUpUserPermision } = require("../validations/user-validations");
const { isValidAddDepartment } = require("../validations/department-validations");

const serverErrorResponse = (res) => {
  res.status(500).json({
    error: "server error",
  });
};

router.get("/departments",trackUserActions, async (req, res) => {
  try {
    const departments = await getDepartments();
    res.json( departments );
  } catch (error) {
    serverErrorResponse(res);
  }
});

// router.get("/departments/:companyId", async (req, res) => {
//   try {
//     const { companyId } = req.params;
//     const departments = await getDepartmentsById(companyId);
//     res.json( departments );
//   } catch (error) {
//     serverErrorResponse(res);
//   }
// });

router.get("/department/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const department = await getDepartmentById(id);
    res.json( department );
  } catch (error) {
    serverErrorResponse(res);
  }
});


router.post("/add-department",trackUserActions,isValidAddDepartment, async (req, res) => {
  try {
   const department =  await createNewDepartment(req.body);
    res.json(department);
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/edit-department/:id",trackUserActions, async (req, res) => {
  try {
    const { id } = req.params;
    await updateDepartmentById(id, req.body);
    res.json({
      message: "department updated",
    });
  } catch (error) {
    serverErrorResponse(res);
  }
});

router.post("/delete-department/:id",trackUserActions,isValidUpUserPermision, async (req, res) => {
  const { id } = req.params;
  try {
    await deleteDepartmentById(id);
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    serverErrorResponse(res);
  }
});



module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Company = require("../models/companies.model");
const {
  createNewCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  getAllDepartments, 
  addDepartment,
  deleteDepartment,
  addManager,
  deleteManager,
} = require("../services-BL/company-service");

const serverErrorResponse = (res) => {
  res.status(500).json({
    error: "server error",
  });
};

router.post("/add-company", async (req, res) => {
  try {
    const newCompany = await createNewCompany(req.body);
    res.status(201).json({ newCompany });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all companies
router.get("/companies", async (req, res) => {
  try {
    const companies = await getAllCompanies() 
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all departments
router.get("/company/departments/:companyId", async (req, res) => {
  try {
    const { companyId } = req.params;
    const departments = await getAllDepartments(companyId);  

    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

// get one specific company by id
router.get("/company/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate(
      "department"
    );
    if (!company) {
      return res.status(404).send("Company not found");
    }
    res.status(200).json(company);
  } catch (error) {}
});

const validateCompanyId = async (req, res, next) => {
  const regEx = /^[0-9a-fA-F]{24}$/;
  if (!regEx.test(req.params.id)) {
    return res.status(404).send("Company Id is not valid");
  } else {
    try {
      req.company = await Company.findById(req.params.id);
      if (!req.company) {
        return res.status(404).send("Company not found");
      }
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

//update a company
router.patch("/company/:companyId", async (req, res) => {
  try{
    const {companyId} = req.params;
    const data = req.body;
    const updatedCompany = await updateCompany(companyId,data)
    res.status(200).json(updatedCompany);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
  // let update = {};
  // for (const key in req.body) {
  //   if (!key === "manager") {
  //     update[key] = req.body[key];
  //   } else {
  //     const usersObjId = [];
  //     for (const user of req.body["manager"])
  //       usersObjId.push(new mongoose.Types.ObjectId(user));
  //     update[key] = usersObjId;
  //     console.log(usersObjId);
  //   }
  // }

  // try {
  //   const updatedCompany = await Company.findByIdAndUpdate(
  //     req.params.id,
  //     { $set: update },
  //     { new: true }
  //   );
 
});

//add department to company
router.post("/add-department/:companyId", async (req, res) => {
  const { companyId } = req.params;
  const { department } = req.body;
  const departmentObjId = new mongoose.Types.ObjectId(department);
  try {
    const addDepartment = await Company.findByIdAndUpdate(companyId, {
      $push: { department: departmentObjId },
    });
    res.status(200).json(addDepartment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/company/:id", validateCompanyId, async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

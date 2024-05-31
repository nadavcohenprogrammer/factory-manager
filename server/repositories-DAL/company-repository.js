const mongoose = require("mongoose");
const Company = require("../models/companies.model");

const createCompany = async (data) => {
  const company = new Company(data);
  return await company.save();
};

const getCompany = async (id) => {
  try {
    return await Company.findById(id)
    .populate("department");
  } catch (err) {
    throw err;
  }
};

const getCompanies = async () => {
  return await Company.find({}).populate("department");
}

const getDepartments = async (companyId) =>{
  return await Company.findById(companyId)
      .populate("department")
      .populate("manager");
}

// Update a single field in the database.
const updateCompanyFields = async (id, updatedFields) => {
  return await Company.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true }
  );
};
// Add a department to a company by its ID.
const addDepartmentToCompany = async (companyId, departmentId) => {
  const departmentObjId = new mongoose.Types.ObjectId(departmentId);
 try {
  return await Company.findByIdAndUpdate(
    companyId,
    {
      $push: {
        departments: departmentObjId
      }
    },
    { new: true }
  );
 } catch (error) {
  throw error;
 }
}

const removeDepFromCompany = async (companyId, departmentId) => {
  const departmentObjId = new mongoose.Types.ObjectId(departmentId);
  try {
   return await Company.findByIdAndUpdate(
     companyId,
     {
       $pull: {
         departments: departmentObjId
       }
     },
     { new: true }
   );
  } catch (err) {
    throw err;
  }
}

const setManagerForCompany = async (companyId, managerId) => {
  const managerObjId = new mongoose.Types.ObjectId(managerId);
  try {
   return await Company.findByIdAndUpdate(
     companyId,
     {
       $push: {
         managers: managerObjId
       }
     },
     { new: true }
   )
  } catch (err) {
    throw err;
  }
};

const removeManagerFromCompany = async (companyId, managerId) => {
  let managers = [];
  try {
    const company = await Company.findById(companyId);
    managers = company.managers.filter(manager => {
      return manager.toString() !== managerId;
    });
    return await Company.findByIdAndUpdate(
      companyId,
      {
        $set: {
          managers: managers
        }
      },
      {new:true}
    ).then(()=>{return `Manager ${managerId} removed from company ${companyId}`});
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  getDepartments,
  updateCompanyFields,
  addDepartmentToCompany,
  removeDepFromCompany,
  setManagerForCompany,
  removeManagerFromCompany,
};

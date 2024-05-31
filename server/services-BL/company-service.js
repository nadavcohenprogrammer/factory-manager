const {
  createCompany,
  getCompanies,
  getCompany,
  getDepartments,
  updateCompanyFields,
  addDepartmentToCompany,
  removeDepFromCompany,
  setManagerForCompany,
  removeManagerFromCompany,
} = require("../repositories-DAL/company-repository");

const validTypeOfId = (id) => {
  return id && typeof id === "string";
};

const createNewCompany = async (data) => {
  return await createCompany(data);
};

const getAllCompanies = async () => await getCompanies();

const getCompanyById = async (id) => {
  if (!validTypeOfId(id)) {
    throw new Error(`Invalid company ID: ${id}`);
  } else {
    return await getCompany(id);
  }
};

const updateCompany = async (id, data) => {
  //update function for name and logo
  if (!validTypeOfId(id)) {
    throw new Error(`Invalid company ID: ${id}`);
  }

  return await updateCompanyFields(id, data);
};

const getAllDepartments = async (companyId) =>{
  if (!validTypeOfId(companyId)) {
    throw new Error(`Invalid  ID: ${(companyId)}`);
  }
  return await getDepartments(companyId)
}

const addDepartment = async (companyId, departmentId) => {
  if (!validTypeOfId(companyId) || !validTypeOfId(departmentId)) {
    throw new Error(`Invalid  ID: ${(companyId, departmentId)}`);
  }

  return await addDepartmentToCompany(companyId, departmentId);
};
const deleteDepartment = async (companyId, departmentId) => {
  if (!validTypeOfId(companyId) || !validTypeOfId(departmentId)) {
    throw new Error(`Invalid  ID: ${(companyId, departmentId)}`);
  }

  return removeDepFromCompany(companyId, departmentId);
};

const addManager = async (companyId, managerId) => {
  if (!validTypeOfId(companyId) || !validTypeOfId(managerId)) {
    throw new Error(`Invalid ID: ${(companyId, managerId)}`);
  }
  const managersInComp = await getCompanyById(companyId).manager;
  if (managersInComp.includes(managerId)) {
    throw new Error("This employee is already a manager");
  }
  return setManagerForCompany(companyId, managerId);
};

const deleteManager = async (companyId, managerId) => {
  const managers = await getCompanyById(companyId).manager;
  if (!managers.includes(managerId)) {
    throw new Error("This employee is not a manager");
  }
  return removeManagerFromCompany(companyId, managerId);
};

module.exports = {
  createNewCompany,
  getAllCompanies,
  getCompanyById,
  getAllDepartments,
  updateCompany,
  addDepartment,
  deleteDepartment,
  addManager,
  deleteManager,
};
//companies.findOne({ _id: id });

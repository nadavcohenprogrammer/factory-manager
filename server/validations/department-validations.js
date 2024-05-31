const { isValidFields, isValidUpdateFields } = require("./utils");



const isValidAddDepartment = async (req,res,next) => {
    const fields = ["departmentName","managerId"];
  if(!isValidUpdateFields(req.body,fields)){
    return res.status(400).json({
      error:"Invalid department fields"
    })
  }
  next();
}

module.exports={isValidAddDepartment}
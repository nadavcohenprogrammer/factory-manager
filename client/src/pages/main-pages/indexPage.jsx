/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Header";
// import SidebarItem from "../../components/Sidebar/SidebarItem";
import { useEffect, useState, useContext } from "react";
import { fetchData, postData } from "../../services/utils";
import NewDepartmentPage from "../Add&Edit-pages/Add-DepartmentPage";
import { UserContext } from '../../UserContext';

const IndexPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [chosenCompany, setChosenCompany] = useState(user?.chosenCompany?.name || user?.company[0]?.name);

  useEffect(() => {
    if (user) {
      setChosenCompany(user?.chosenCompany?.name || user?.company[0]?.name);
      const fetchCompanies = async () => {
        try {
          const companiesData = user.company;
          setCompanies(companiesData);
        } catch (error) {
          console.error("Error fetching companies:", error);
        }
      };
      fetchCompanies();
    }
  }, [user]);

  const handleFormToggle = (open) => {
    setOpenForm(open);
  };

  const handleChooseCompany = (company) => {
    setUser({ ...user, chosenCompany: company });
    // navigate(`/edit-company/${company._id.toString()}`);
  };

  return (
    <div className="flex">
      {/* <SidebarItem /> */}
      <div className="flex-grow">
        {companies.length > 0 ? (
          companies.map((company) => (
            <div
              key={company._id}
              className="max-w-screen-2xl h-screen mx-auto mt-8 ml-2 p-2 bg-white rounded-lg border-2 shadow-2xl"
            >
              <div className="flex justify-center">
                <div className="flex max-w-fit gap-2 items-center border border-gray-300 mb-12 rounded-full p-2 px-4 shadow-md shadow-gray-400/50">
                  <div
                    onClick={() => handleChooseCompany(company)}
                    className="cursor-pointer flex flex-row gap-2 items-center"
                  >
                    <Link
                      to={`/edit-company/${company._id.toString()}`}
                      className="text-xl ml-2 text-center font-serif"
                    >
                      {company.name}
                    </Link>
                  </div>
                  {company.logo && (
                    <div className="flex items-center">
                      <img
                        src={`https://factory-manager-backend.onrender.com/uploads/${company.logo}`}
                        alt="company logo"
                        className="w-40 h-20 object-contain rounded-2xl"
                      />
                    </div>
                  )}
                </div>
              </div>
              {openForm && company.department.length === 0 ? (
                <NewDepartmentPage handleForm={handleFormToggle} direct="/" />
              ) : company.department.length === 0 ? (
                <div className="max-w-md mx-auto mt-36 p-24 bg-slate-400 rounded-xl flex justify-center shadow-xl">
                  <button
                    onClick={() => setOpenForm(!openForm)}
                    className="text-xl text-center text-white rounded-xl bg-blue-600 hover:bg-blue-800 p-2 font-semibold"
                  >
                    Add New Department
                  </button>
                </div>
              ) : (
                <div>
                  {company.department.map((depart) => (
                    <div key={depart._id} onClick={() => handleChooseCompany(company)}>
                      <Link
                        to={`/departments/${company._id.toString()}`}
                        className="max-w-md mx-auto mt-8 p-4 bg-slate-400 rounded-full flex justify-center shadow-xl"
                      >
                        {depart.name}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : user ? (
          <div>You Have No Companies yet</div>
        ) : (
          <div>Please login or register</div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;

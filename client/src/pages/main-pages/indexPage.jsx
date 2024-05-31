/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import Header from "../../Header"
import SidebarItem from "../../components/Sidebar/SidebarItem"
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, postData } from "../../services/utils";
import NewDepartmentPage from "../Add&Edit-pages/Add-DepartmentPage";
import { UserContext } from '../../UserContext'


const IndexPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)
  const [companies, setCompanies] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [chosenCompany, setChosenCompany] =
    useState(user?.chosenCompany.name || user?.company[0]?.name);

  useEffect(() => {
    setChosenCompany(user?.chosenCompany.name || user?.company[0]?.name)
    console.log(user?.chosenCompany)
    const getData = async () => {
      if (user && user.role !== "user") {
        const companies = user.company;
        setCompanies(companies);

      } else {
        const companies = user.company;
        setCompanies(companies);
      }
    }
    if (user)
      getData();
  }, [user, chosenCompany]);

  const handleForm = (open) => {
    setOpenForm(open)
  }

  const handleChoseCompany = (company) => {
    setUser({ ...user, chosenCompany: company })
    navigate(`/edit-company/${company._id.toString()}`)

  }

  return (
    <div>
      <div className="flex ">
        <SidebarItem />
        <div className="flex-grow">
          {companies && companies.length > 0 ? companies.map(company => {
            return (
              <div key={company._id} className="max-w-screen-2xl h-screen mx-auto mt-8 ml-2 p-2 bg-white rounded-lg border-2 shadow-2xl">
                <div className="flex justify-center">
                  <div className='flex max-w-fit gap-2 border border-gray-300 mb-12 rounded-full p-2 px-4 shadow-md shadow-gray-400/50'>
                    <div onClick={() => handleChoseCompany(company)} className="cursor-pointer flex flex-row gap-2 items-center">
                      <h1 className="text-xl ml-2 text-center font-serif">{company.name}</h1>
                    </div>
                    {company.logo && <label>
                      <img src={'http://localhost:3000/uploads/' + company.logo} alt='company logo' className='object-cover max-w-48' />
                    </label>}
                  </div>
                </div>
                {openForm && company.department.length === 0 ? (
                  <NewDepartmentPage handleForm={handleForm} direct="/" />
                ) : company.department.length === 0 ? (
                  <div className="max-w-md mx-auto mt-36 p-24 bg-slate-400 rounded-xl flex justify-center shadow-xl">
                    <button onClick={() => setOpenForm(!openForm)} className="text-xl text-center text-white rounded-xl bg-blue-600 hover:bg-blue-800 p-2 font-semibold">
                      Add New Department
                    </button>
                  </div>
                ) : (
                  <div>
                    {company.department.map(depart => (
                      <Link to={`/departments/${company._id.toString()}`} 
                      key={depart._id} 
                      className="max-w-md mx-auto mt-8 p-4 bg-slate-400 rounded-full flex justify-center shadow-xl">
                        {depart.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }) : <div>You Have No Companies yet</div>}
        </div>
      </div>
    </div>

  )
}

export default IndexPage



/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsArrowLeftShort, BsSearch, BsChevronDown, BsPerson } from "react-icons/bs"
import { AiFillEnvironment, AiFillProject, AiOutlineAim, AiOutlineBarChart, AiOutlineLogout, AiOutlineMail, AiOutlineSetting } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { SiCivicrm } from "react-icons/si";
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../services/utils";
import { UserContext } from "../../UserContext";

const SidebarItem = () => {
    const { user ,setUser} = useContext(UserContext);
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const [companies, setCompanies] = useState([])

    // useEffect(() => {
    //   const importData = async () => {
    //     const companies = await fetchData(`/users/companies/${user._id}`);
    //     console.log(companies)
    //     setCompanies(companies);
    //   }
    //   importData()
    // }, [])

    const Menus = [
        {
            title: "Home",
            icon: < FaHome />,
            spacing: true,
            link: "/"
        },
        { title: "CRM", icon: <SiCivicrm />, link: "/crm" },
        { title: "Dashboard" },
        {
            title: "Companies",
            icon: <AiFillProject />,
            submenu: true,
            submenuItems: [
                user?.company?.map(company => ({
                    title: company.name,
                    id: company._id,
                    link: `/departments/${company._id}`,
                    departments: [
                        company.department.map(depart => ({
                            title: depart.name,
                            id: depart._id,
                            link: `/departments/${company._id}`,
                        }))],
                }))

            ],

        },
        { title: "Analytics", icon: <AiOutlineBarChart /> },
        { title: "Inbox", spacing: true, icon: <AiOutlineMail /> },
        { title: "Calendar", icon: <AiOutlineAim /> },
        { title: "Settings", spacing: true, icon: <AiOutlineSetting /> },

        // { title: "Profile", icon: <BsPerson /> },
        // { title: "Logout", icon: <AiOutlineLogout /> },

    ];

    const toggleSubmenu = (index) => {
        setSubmenuOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
        if (Menus[index].link) {
            navigate(Menus[index].link);
        }
    };

    const handleChoseCompany = (companyId) => {
        setUser({ ...user, chosenCompany: companyId })
        
        navigate(`/departments/${companyId}`)
    
      }

    // if (true) {
    return (
        <div className="mr-2 left-0 flex">
            <div
                className={`bg-slate-500 sticky mt-5 top-0 h-screen z-40  pt-8 ${open ? "w-72" : " w-20"} 
                duration-300 relative rounded-tl-sm rounded-bl-sm  scrollbar-hidden
                hover:overflow-y-auto scroll-padding-inline-start scroll-smooth focus:scroll-auto max-h-screen rounded-tr-xl rounded-br-xl`}>
                <BsArrowLeftShort
                    className={`bg-white text-slate-500 text-3xl rounded-full 
                    absolute -right-3 top-9 border border-slate-500 cursor-pointer 
                    ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)} />

                <div className="inline-flex">
                    <AiFillEnvironment
                        className={`bg-amber-300 text-4xl rounded cursor-pointer 
                        block ml-4 float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
                    <h1
                        className={`text-white origin-left font-medium text-2xl 
                        duration-300 ${!open && "scale-0"}`}>
                        Nadav Cohen
                    </h1>
                </div>
                <div className={`flex items-center  bg-slate-300 mt-6 ml-1 mr-1 
                ${!open ? "px-7 rounded-full" : " px-4 rounded-md"} py-2`}>
                    <BsSearch
                        className={`text-white text-lg block float-left 
                    cursor-pointer ${open && "mr-2 text-xl"}`} />
                    <input type={"search"}
                        className={`bg-transparent outline-none border-none
                         text-slate-500 
                        placeholder-white flex-1 ${!open && "hidden"}`}
                        placeholder="Search..." />
                </div>

                <ul>
                    {Menus.map((menu, index) => (
                        <span key={index + 1}>
                            <li key={index} onClick={() => toggleSubmenu(index)}
                                className={`text-white text-md flex items-center gap-x-4 
                        cursor-pointer p-2 hover:bg-slate-200 
                        hover:text-slate-500 hover:rounded-tl-full hover:rounded-[10px] 
                        ${!open && " hover:rounded-full px-5 mr-1 ml-1"} 
                        ${menu.spacing ? "mt-9" : "mt-2"}`}>
                                <span className={`text-2xl block ml-2 float-left ${!open && " text-3xl"}`}>
                                    {menu.icon ? menu.icon : <RiDashboardFill />}
                                </span>
                                <span
                                    className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                                    {menu.title}
                                </span>
                                {menu.submenu && open && (
                                    <BsChevronDown className={`${submenuOpen[index] && "rotate-180"}`} />
                                )}
                            </li>


                            {menu.submenu && open && submenuOpen[index] && (
                                <ul >
                                    {menu.submenuItems[0].map((subItem) => (
                                        <li className="mt-2" key={subItem.id}
                                            >
                                            <span className={`text-white text-md gap-x-4 
                                        cursor-pointer p-2 hover:bg-slate-200 
                                        hover:text-slate-500 hover:rounded-xl ml-8`}>

                                            <span  onClick={()=>handleChoseCompany(subItem.id)} 
                                            className={` text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>
                                                {subItem.title}
                                            </span>
                                            </span>
                                            {subItem.departments && (
                                                <BsChevronDown  onClick={() => toggleSubmenu(subItem.id)} 
                                                className={`hover:bg-slate-300 hover:rounded-sm ml-12 mt-2 ${submenuOpen[subItem.id] && "rotate-180"}`} />
                                            )}

                                            {subItem.departments && submenuOpen[subItem.id] && (
                                                <ul className="list-disc ">
                                                    {subItem.departments[0].map((department) => (
                                                        <li  className={`text-white text-md flex  items-center gap-x-4 
                                                        cursor-pointer p-1 hover:bg-slate-200 
                                                        hover:text-slate-500 hover:rounded-xl ml-14`} 
                                                        key={department.id} >
                                                            {department.title}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </span>
                    ))}
                </ul>
            </div>

        </div>
    )

    // }
}

export default SidebarItem;
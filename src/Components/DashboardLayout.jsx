import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiUserSharedFill } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBorderStyle } from "react-icons/fa";
import './CSS/DashboardLayout.css'
import { NavLink} from 'react-router-dom'
import { LayoutDashboard, Menu,ChevronDown, X, LogOut } from 'lucide-react'

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigate = useNavigate()
  const [loginPerson,setLoginPerson] = useState('')
 const [role,setRole] = useState('')
 useEffect(() => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (!token) {
    navigate('/')
    return
  }

  if (user) {
    const Loginedperson = JSON.parse(user)
    setLoginPerson(Loginedperson.name)
    setRole(Loginedperson.role)
  }
}, [navigate])

  const handleLogout= ()=>{
    localStorage.removeItem('token')
     localStorage.removeItem('user')
    navigate('/')
  }

  const tabs={
    admin:[
      {
        name:"Dashboard",
        path:"/dashboard",
        icon:<LayoutDashboard/>
      },
       {
        name:"Category",
        path:"/category",
        icon:<BiCategoryAlt size={28}/>
      },
      {
        name : "subCategory",
        path : "/sub-category",
        icon :<BiCategoryAlt size={28}/>
      },
       {
        name:"Products",
        path:"/product",
        icon:<MdOutlineProductionQuantityLimits size={28}/>

      },
       {
        name:"Orders",
        path:"/order",
        icon:<FaBorderStyle size={26}/>
      },
       {
        name:"Users",
        path:"/users",
        icon:<RiUserSharedFill size={28}/>
      },
    ],
    customer:[
      {
        name:"customer1",
        path:"/my-customer",
        icon:<LayoutDashboard/>
      },
       {
        name:"Address",
        path:"/my-address",
        icon:<LayoutDashboard/>
      },
       {
        name:"My-Cart",
        path:"/my-cart",
        icon:<LayoutDashboard/>
      },
      {
        name:"My-Order",
        path:"/my-order",
        icon:<LayoutDashboard/>
      },
    ]
  }
  return (
    <>
    <div className="dashboard-outer">
      <div className={`sidebar ${sidebarOpen ? 'open' : 'close'}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">D</div> <span>Dashboard</span>
        </div>
        <div className="sidebar-tabs">
          {tabs[role]?.map((tab,index)=>(
            <NavLink key={index} to={tab.path}>
              {tab.icon} {tab.name}
            </NavLink>
          ))}
        </div> <br />  <br />
        <hr /> <br />
        <div className="sidebar-logout" onClick={handleLogout}>
          <LogOut /> <span>Logout</span>
        </div>
      </div>
      <div className="main">
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X /> : <Menu />}</button>
            <h1>Welcome Back ! {loginPerson}</h1>

          </div>

          <div className="dashboard-header-right">
            <div className="dashboard-admin-outer">
              <div className="admin">AD</div>
              <div className="admin-dropdown">
                <div className="admin-dropdown-left">
                  <p>Admin</p>
                  <span>Panel</span>
                </div>
                <div className="dropdown-icons">
                  <ChevronDown />
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="dashboard-content" style={{background:"#f80451b5"}}>
          {children}
        </div>
      </div>
    </div>
    </>
  )
}

export default DashboardLayout
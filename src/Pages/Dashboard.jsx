import { useEffect } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const api_url = import.meta.env.VITE_API_URL
  const verifyToken=async()=>{
    try{
      const res = await axios.get(`${api_url}/api/user/check-token`,
        {
          headers:{
            Authorization: token
          }
        }
      )
    } catch (error){
      localStorage.removeItem('token')
      navigate('/')
    }
  }
  useEffect(() => {
  if (!token) {
    navigate('/')
    return
  }

  verifyToken()
}, [token])
  return (
    <DashboardLayout>
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}
  >
    <h1>Dashboard</h1>
    <p>This is dashboard content.</p>
  </div>
</DashboardLayout>
  )
}

export default Dashboard
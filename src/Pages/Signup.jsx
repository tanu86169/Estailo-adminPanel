import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";

const Signup = () => {

  const navigate = useNavigate()
  const api_url = import.meta.env.VITE_API_URL;
  // console.log(api_url)
  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    role:"customer"
  })

  const handleChange = (e) => {
   const {name,value} = e.target
   setForm({
    ...form,
    [name]:value
   })
  }

  const handleSubmit =async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(`${api_url}/api/user/register`,form)
      console.log(res.data)
      if(res.status===200 || res.status===201){
        Swal.fire({
                  position:"top-end",
                  icon:"success",
                  title:"Signup Successfull",
                  text:"Welcome Back !",
                  timer:1500,
                  showConfirmButton:false
                }).then(()=>{
                  navigate('/login')
                })
      }
    } catch (error) {
  console.log(error);

  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.response?.data?.message || error.message,
  });
}
  }
  return (
    <><div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 relative overflow-hidden">
      <form className="bg-white p-8 rounded-lg w-96 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl" onSubmit={handleSubmit}>
     <h1 className=" flex text-3xl items-center justify-center mb-4 text-gray-200">signup</h1> <br />
     <input 
     type="text"
     placeholder='enter your name'
     name='name'
     value={form.name}
     className='w-full border p-2 mb-3 bg-white/20 border border-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white rounded'
     onChange={handleChange}
     required
     /> <br /><br />
     <input 
     type="email"
     placeholder='enter your email'
     name='email'
     value={form.email}
     className='w-full border p-2 mb-3 bg-white/20 border border-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white rounded' 
     onChange={handleChange}
     required
     /> <br /><br />
     <input 
     type="password"
     placeholder='enter your password'
     name='password'
     value={form.password}
     className='w-full border p-2 mb-3 bg-white/20 border border-white/30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-white rounded'
     onChange={handleChange}
     required
     /> <br /><br />
     <button type='submit' className='w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105'>submit</button>
     </form>
     </div>
    </>
  )
}

export default Signup
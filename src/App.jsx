import 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Signup from './Pages/Signup'
import Category from './Pages/Category'
import Products from './Pages/Products'
import Users from './Pages/Users'
import Orders from './Pages/Orders'
import ForgotPassword from './Pages/ForgotPassword'
import SubCategory from './Pages/SubCategory'


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/category' element={<Category/>} />
          <Route path='/product' element={<Products/>} />
          <Route path='/Users' element={<Users/>} />
          <Route path='/order' element={<Orders/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path ='/sub-category' element={<SubCategory/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
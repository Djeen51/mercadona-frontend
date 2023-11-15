// pour le correcteur, voici les identifiants pour se connecter sur le panneau admin : 

// adresse mail : correcteur@gmail.com
// password : test12345

import {HashRouter as BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './pages/HomePage'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import ProductPage from './pages/ProductPage'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserList from './pages/UserList'
import UserEdit from './pages/UserEdit'
import ProductsListAdmin from './pages/ProductsListAdmin'
import ProductEdit from './pages/ProductEdit'







function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route index element ={<Homepage/>} />
          <Route path="catalogue" element={<Products />} />
          <Route path='catalogue/:id' element={<ProductPage />} />
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='profile' element={<Profile/>} />
          <Route path='admin/userList' element={<UserList/>} />
          <Route path='admin/user/:id/edit' element={<UserEdit/>} />
          <Route path='admin/productList' element={<ProductsListAdmin/>} />
          <Route path='/admin/product/:productId/edit' element={<ProductEdit/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>   

  )
}

export default App

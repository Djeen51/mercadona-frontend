import { configureStore } from '@reduxjs/toolkit'
import { productListReducer, productUpdateReducer, productDetailsReducer, productDeleteReducer, productCreateReducer } from "./reducers/productReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userUpdateReducer,
    userListReducer,  } from './reducers/userReducers';




 export const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

 const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
}

const store = configureStore({
        // Automatically calls `combineReducers`
        reducer: {
            productList: productListReducer,
            productDetails: productDetailsReducer,
            productDelete: productDeleteReducer,
            productCreate: productCreateReducer,
            productUpdate: productUpdateReducer,

            userLogin: userLoginReducer,
            userRegister: userRegisterReducer,
            userDetails: userDetailsReducer,
            userUpdateProfile: userUpdateProfileReducer,
            userList: userListReducer,
            userUpdate: userUpdateReducer,
        }
      }, initialState)
      
  export default store
  
  
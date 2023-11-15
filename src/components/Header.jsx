import styles from './Header.module.css'
import { useState } from "react"
import Logo from "./Logo"
import { Link, NavLink } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'





function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const [showDropdown, setShowDropdown] = useState(false); 
    const {userInfo} = userLogin;
    
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }


    return (
        <nav className={styles.header}>
            <Logo/>
            <div className={styles.shopping}><div><NavLink to="/catalogue">Shopping</NavLink></div></div>
           
            <div className={styles.loginContainer}>
            {userInfo ? (
                <>
                <div className={styles.login} onClick={toggleDropdown}><div>{userInfo.name}</div></div>
                {showDropdown && (
                    <div className={styles.wrap}>
                        <div>
                            <Link className={styles.subMenuLink} to='/profile'>
                                <p>EDIT PROFILE</p>
                            </Link></div>
                        {userInfo.isAdmin && (
                            <>
                            <div>
                            <Link className={styles.subMenuLink} to='/admin/userList'>
                                <p>EDIT USERLIST</p>
                            </Link>
                            </div>
                            <div>
                                <Link className={styles.subMenuLink} to='/admin/productList'>
                                <p>EDIT PRODUCT</p>
                                </Link>    
                            </div>                        
                            </>
                        )}
                        <div> <Link className={styles.subMenuLink} to='/' style={{ color: 'red' }} onClick={logoutHandler}>
                                <p>Logout</p>
                            </Link></div>
                        </div>
                )}
                </>
            ): (
                <div>
                <NavLink to="/Login">Login</NavLink>
                </div>                
            )            
            }
            </div>
        </nav>
    )
}

export default Header

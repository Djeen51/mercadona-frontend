import { useState } from "react"
import Logo from "./Logo"
import styles from './PageNav.module.css'
import { Link, NavLink } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'

function PageNav() {
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
            <div className={styles.pageNav}>
                <nav >
                <Logo />
                    <ul>
                        <li>
                        <NavLink to="/catalogue">Shopping</NavLink>
                        </li>
                        <li>
                        <NavLink to="/contact">Contact</NavLink>
                        </li>
                        <li>
                        <div>
                        {userInfo ? (
                        
                        <div className={styles.subMenuWrap}>
                             <div className={styles.userInfo}>
                                <h2 onClick={toggleDropdown}>{userInfo.name}</h2>
                            </div>
                            <div className={styles.subMenu}>                           
                            {showDropdown && ( 
                                <div>
                                <hr />
                                {userInfo.isAdmin && (
                                    <>
                                    <Link className={styles.subMenuLink} to='/admin/userList'>
                                        <p>EDIT USERLIST</p>
                                    </Link>
                                    <Link className={styles.subMenuLink} to='/admin/productList'>
                                        <p>EDIT PRODUCT</p>
                                    </Link>
                                    </>
                                )}
                                <Link className={styles.subMenuLink} to='/profile'>
                                    <p>{userInfo.name}</p>
                                </Link>
                                <Link className={styles.subMenuLink} to='/' style={{ color: 'red' }} onClick={logoutHandler}>
                                    <p>Logout</p>
                                </Link>
                                </div>
                            )}
                            </div>
                        </div>
                        ) : (
                        <div>
                            <NavLink to="/Login">Login</NavLink>
                        </div>
                        )}
                    </div>
                        </li>
                    </ul>

                </nav>

            </div>
          );
        }
    

export default PageNav


// (
//     <li className={styles.dropdown}>    
         
//          {userInfo.isAdmin && (
//         <>
//         <Link to='/admin/userList'>userList</Link>
//         <Link to='/admin/productList' style={{color: "blue" }}> EDIT Products</Link>
//         </>

//         )    
        
//         }
//          <Link  to='/profile' className={styles.dropbtn}>{userInfo.name}</Link>
//          <Link  to='/' style={{color: "red" }} onClick={logoutHandler}>Logout</Link>
//     </li>
// )
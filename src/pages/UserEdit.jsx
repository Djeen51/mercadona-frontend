import styles from './Register.module.css'
// import PageNav from '../components/PageNav';
import { useEffect, useState,   } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import {USER_UPDATE_RESET} from '../constants/userConstants'
import Button from '../components/Button';
import Header from '../components/Header';

function EditUser() {

    const {id} = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

  
    // Use the useSearchParams hook to access and manage query parameters

    const dispatch = useDispatch()
  

    const userDetails = useSelector(state => state.userDetails)
    const { error, user } = userDetails;

    const navigate = useNavigate()
    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, success: successUpdate } = userUpdate;
      
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:user._id, name, email, isAdmin}))
    }
  
  
    useEffect(() => {
        if(successUpdate) {
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userList')
        } else {
            if(!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        if(!user.name || user._id !== Number(id)) {
            dispatch(getUserDetails(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [id, user, dispatch, successUpdate, navigate])
  

    return (
        <>
        <Header />
        <main className={styles.userEdit}>
          <section>
            {errorUpdate && <h2>Error Occured</h2>}
            <Link style={{fontSize: "18px", marginLeft:"5rem", marginTop: "3rem"}} to='/admin/userList'>
                Go back
            </Link>
            <div>
                {error && <div>{error}</div>}
                <h1 style={{color: "green", fontSize:"18px", textAlign: "center"}}>Edit User</h1>
                <form onSubmit={submitHandler} className={styles.form}>
                <div className={styles.row}>
                    <label htmlFor="name">Name</label>
                    <input
                    type="name"
                    id="name"
                    placeholder='Type your name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    />
                </div>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                    type="email"
                    id="email"
                    placeholder='type your email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor='isAdmin'>Is Admin?</label>
                    <input
                    label="Is Admin"
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                </div>  
                <div>
                    <Button><h2>Update</h2></Button>
                </div>
                </form>  
            </div>    
          </section>
        </main>
        </>
      );
    }

export default EditUser

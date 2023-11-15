import styles from './Profile.module.css'
import { useEffect, useState  } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col} from 'react-bootstrap'
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Button from '../components/Button';
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import Header from '../components/Header';

function Profile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
  

    const navigate = useNavigate()
    const dispatch = useDispatch()
  

    const userDetails = useSelector(state => state.userDetails)
    const { error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile;

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {
            if(!user || !user.name || success || userInfo._id !==user._id ) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])
  


      
    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
        

    }
    return (
        <>
        <Header/>
        <main className={styles.profile}>
                <Col md={3} style={{padding: "3rem"}}>
                    <h2 className={styles.row} >User Profile</h2>
                    {message && <h2>{message}</h2>}
                    {error && <div>{error}</div>}
                    <form onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.row}>
                        <label htmlFor="name"></label>
                        <input
                        type="name"
                        id="name"
                        placeholder='Type your name'
                        required
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
                        <label htmlFor="password">Password</label>
                        <input
                        placeholder='type your password'
                        type="password"
                        id="password"
                        
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        />
                    </div>  
                    <div className={styles.row}>
                        <label htmlFor="password">Confirm Password</label>
                        <input
                        placeholder='Confirm your password'
                        type="password"
                        id="ConfirmPassword"
                        
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        />
                    </div>  
                    <br/>
                    <div>
                        <Button><h2>Update</h2></Button>
                    </div>
                    </form> 
                </Col>
        </main>
        </>
    )
}

export default Profile

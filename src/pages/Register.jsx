import styles from './Register.module.css'
// import PageNav from '../components/PageNav';
import { useEffect, useState  } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { register } from "../actions/userActions";
import Button from '../components/Button';
import Header from '../components/Header';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("qwerty");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
  
    // Use the useSearchParams hook to access and manage query parameters
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const redirect = location.state ? Number(location.state) : '/'
    const userRegister = useSelector(state => state.userRegister)
    const { error, userInfo } = userRegister;
      
    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
        

    }
  
  
    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])
  

    return (
        <>
        <Header />
        <main className={styles.register}>
          <section>
            <div>
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
                    <label htmlFor="password"></label>
                    <input
                    placeholder='type your password'
                    type="password"
                    id="password"
                    required
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
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    />
                </div>  
                <div>
                    <Button><h2>Register</h2></Button>
                </div>
                </form>  
                <h2>Have an Account? <Link 
                to={redirect ? `/login?redirect=${redirect}` : `/login`}>
                Sign in</Link>
                </h2>
            </div>    
          </section>
        </main>
        </>
      );
    }

export default Register

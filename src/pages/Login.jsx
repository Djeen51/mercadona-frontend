import { useEffect, useState  } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useSearchParams } from 'react-router-dom';
import styles from "./Login.module.css";
import { login } from "../actions/userActions";
import Button from "../components/Button";
import Header from "../components/Header";



export default function Login() {
  const [email, setEmail] = useState("correcteur@gmail.com");
  const [password, setPassword] = useState("test12345");


  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const redirect = location.state ? Number(location.state) : '/'
  const userLogin = useSelector(state => state.userLogin)
  const { error, userInfo } = userLogin


  useEffect(() => {
      if(userInfo) {
          navigate(redirect)
      }
  }, [navigate, userInfo, redirect])

  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
}

  return (
    <>
    <Header/>
    <main className={styles.login}>
      <section>
        <div>
          <div>
            {error && <div>{error}</div>}
            <form onSubmit={submitHandler} className={styles.form}>
              <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="name"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <div>
                <Button ><h2 style={{color: "whitesmoke"}}>Login</h2></Button>
              </div>
            </form>
            <h2 style={{color: "whitesmoke"}} >New Customer? <Link style={{color: "green"}}
              to={redirect ? `/register?redirect=${redirect}` : `/register`}>
              Register</Link>
            </h2>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}


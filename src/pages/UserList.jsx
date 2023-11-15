import styles from './UserList.module.css'
import { useEffect  } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { listUsers } from "../actions/userActions";
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';



function UserList() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userList = useSelector(state => state.userList)

    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    const {users} = userList;

    useEffect(()=> {
     if(userInfo && userInfo.isAdmin)  {
         dispatch(listUsers())
        } else {
            navigate('/login')
        } 
    }, [dispatch, userInfo, navigate])

    const deleteHandler = (id) => {
        console.log(`DELETE : ${id} fonction pas implementé` )
    }

    const editUserHandler = (id) => {
        console.log(`EDIT : ${id} fonction pas implementé` )
    }

    console.log(users)
    
    return (
        <>
        <Header/>
        <main > 
            {users? ( <div className={styles.userList}> 
                        <h1>Users</h1>
                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin? (
                                        <i className='fas fa-check' style={{color: "green"}}></i>
                                        ) : (
                                        <i className='fas fa-check' style={{color: "red"}}></i>     
                                        )}</td>
                                    <td>
                                        <Link to={`/admin/user/${user._id}/edit`}>
                                            <button onClick={() => editUserHandler(user._id)}><i className='fas fa-edit'></i></button>
                                        </Link>
                                            <button onClick={() => deleteHandler(user._id)}><i className='fas fa-trash'></i></button>
                                    </td>    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </div>
                    ) : <p>user loading ....</p>}
        </main>
        </>
             )
                }

export default UserList

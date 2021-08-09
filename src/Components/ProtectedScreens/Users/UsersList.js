import React,{useContext} from 'react'
import '../../form.css'
import { InvoiceContext } from '../../Context/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
function UsersList({list}) {
    const {loggedin_user} = useContext(InvoiceContext)
    const history = useHistory()
    const deleteHandler = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BE_SERVER_URL}/api/users/deleteUser/${id}`)
            toast.success('User Deleted',{
                position: "top-right",
                autoClose: 5000
            })
            setTimeout(() => {
                history.go();
            }, 3000); 
        } catch (error) {
            toast.error(error.response.data.error,{
                position: "top-right",
                autoClose: 5000
            })
        }
    }
    return (
        <>
        <ToastContainer />
        <table class="table borderless table-hover rounded">
            <thead>
                <tr style={{color:'darkblue'}}>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope='col'>Email</th>
                    <th scope="col">Role</th>
                    {
                        loggedin_user.role === 'admin' && (
                            <th scope='col'>Action</th>
                        )
                    }
                </tr>
            </thead>
            <tbody style={{color : 'rgb(218, 31, 146)'}}>
                {
                    list.map((list,index) => {
                        return <tr key = {index}>
                            <td>{list.fname}</td>
                            <td>{list.lname}</td>
                            <td>{list.email}</td>
                            <td>{list.role}</td>
                            {
                                loggedin_user.role === 'admin' && (
                                    <td><button className='btn btn-sm btn-danger' onClick={()=>deleteHandler(list._id)}>Delete <i class="fad fa-trash"></i></button></td>
                                )
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
        </>
    )
}

export default UsersList

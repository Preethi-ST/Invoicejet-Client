import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link} from 'react-router-dom'
import UsersList from './UsersList'
import '../../form.css'
function AllUsers() {
    const [clients,setClients] = useState([])
    const [users,setUsers] = useState([])
    const getUsersData = async () => {
        await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/users/viewUsers`)
        .then(res => {
            setUsers(res.data.users)
            setClients(res.data.clients)
        })
    }
    useEffect(() => {
        getUsersData()
        return () => {
            <></>
        }
    }, [])
    return (
        <div className='container-fluid p-3'>
            <h3 className='text-success' style={{display:'inline-block'}}>All Users</h3>
            <Link to = '/adduser'>
                <button type="button" style={{display:'inline-block'}} class="btn btn-success btn-circle float-right mb-5"><i class="fas fa-plus-circle"></i></button>
            </Link>
            {
                users.length ? (
                    <>
                        <h4 className='text-info'>Employee List</h4>
                        <hr />
                        <UsersList list={users} />
                    </>

                ) : ''
            }
            {
                clients.length && (
                    <>
                        <h4 className='text-info'>Clients List</h4>
                        <hr />
                        <UsersList list={clients} />    
                    </>

                )
            }
        </div>
    )
}

export default AllUsers

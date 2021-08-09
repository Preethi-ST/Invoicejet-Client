import axios from 'axios'
import React, { useState,useEffect,useContext } from 'react'
import { useHistory } from 'react-router'
import './Dashboard.css'
import { InvoiceContext } from '../Context/Context'
import * as FaIcons from 'react-icons/fa';
import * as Io5Icons from 'react-icons/io5';

function Dashboard() {
    const history = useHistory()
    const {loggedin_user} = useContext(InvoiceContext)
    const [dashboard, setdashboard] = useState({})
    const getData = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/dashboard/dashboard`, {currentUserRole:loggedin_user.role})
            .then(res => {
               setdashboard(res.data)
            })
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        loggedin_user ?  getData()   : history.push('/login') 
        return () => {
            <></>
        }
    }, [])
    return (
        <div className="container-fluid content-center dashboard">
            <div className="col-auto mt-3" >
                <div className='container'>
                <div class="card mb-3 shadow py-2 border-success text-success" style={{borderLeft : '10px solid green'}}>
                    <div class="card-body text-center">
                        <div className = 'dashboard_icons'><FaIcons.FaFileInvoiceDollar /></div>
                        <div style={{display:'inline-block',marginLeft:'30px'}}> 
                            <h5 class="card-title" >Total Invoice</h5>
                            <p class="card-text text-bold">{dashboard.total_count}</p>
                        </div>  
                    </div>
                </div>
                <div class="card mb-3 shadow py-2 border-warning text-warning" style={{borderLeft : '10px solid yellow'}}>
                    <div class="card-body text-center">
                        <div className = 'dashboard_icons'><Io5Icons.IoToday /></div>
                        <div style={{display:'inline-block',marginLeft:'30px'}}>
                            <h5 class="card-title" >Today count</h5>
                            <p class="card-text text-bold">{dashboard.today_count}</p>
                        </div>  
                    </div>
                </div>
                <div class="card mb-3 shadow py-2 border-info text-info" style={{borderLeft : '10px solid teal'}}>
                    <div class="card-body text-center">
                        <div className = 'dashboard_icons'><Io5Icons.IoPersonSharp /></div>
                        <div style={{display:'inline-block',marginLeft:'30px'}}>
                            <h5 class="card-title" >Total Clients</h5>
                            <p class="card-text text-bold">{dashboard.total_client}</p>
                        </div>  
                    </div>
                </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard

import React, { useContext, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as Io5Icons from 'react-icons/io5';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';
import { IconContext } from 'react-icons';
import { InvoiceContext } from '../../Context/Context';


const Sidebar = () => {
    const {loggedin_user,dispatch} = useContext(InvoiceContext)
    const history = useHistory()
    const [sidebar,setSidebar] = useState(false)

    /* Toggle sidebar on clicking icon */
    const showSidebar = () => {
        setSidebar(!sidebar);
    }
    const handleLogout = async () => {
        try{
          await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/users/logout`)
          dispatch({type:'LOGOUT'})
          history.push('/')
        }catch(error){
          alert('Something went wrong')
        }
      }

    return (
        <IconContext.Provider value={{ color: '#ADEFD1FF' }}>
            <div className = 'navbar text-white'>
                {/* Show toggle icon only if user logged in  */}
                {
                    loggedin_user && (
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                    )
                }
                {
                    loggedin_user ? (
                        <span className='logo-text' style={{fontSize:'2rem'}}>Invoicejet</span>
                    ):
                    <Link to='/'>
                        <span className='logo-text' style={{fontSize:'2rem'}}>Invoicejet</span>
                    </Link>
                }
                {
                    !loggedin_user
                    ?
                    <>
                    <Link to='/login' className='menu-bars ml-auto'>
                        <span>Login</span>
                    </Link>
                    <Link to='/contact' className='menu-bars'>
                        <span>Contact</span>
                    </Link>
                    </>
                    :
                    <>
                    <span className='ml-auto'>Hello, <strong>{loggedin_user.fname}</strong></span>
                    </>
                }
            </div>
            {
                loggedin_user && (
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars pl-4'>
                                    <AiIcons.AiOutlineClose />
                                    <span className='logo-text mt-4 mr-3' style={{fontSize:'2rem'}}>Invoicejet</span>   
                                </Link>
                            </li>
                            {
                                (loggedin_user.role === 'admin' || loggedin_user.role === 'manager') && (
                                    <li className = 'nav-text'>
                                        <Link to='/dashboard'>
                                            <AiIcons.AiFillHome />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                )
                            }
                            {
                                loggedin_user.role !== 'client' && (
                                    <>
                                    <li className = 'nav-text'>
                                        <Link to='/allinvoices'>
                                        <FaIcons.FaFileInvoiceDollar />
                                            <span>All Invoice</span>
                                        </Link>
                                    </li>
                                    <li className = 'nav-text'>
                                        <Link to='/addinvoice'>
                                        <FaIcons.FaFileInvoiceDollar />
                                            <span>Create Invoice</span>
                                        </Link>
                                    </li>
                                    <li className = 'nav-text'>
                                        <Link to='/allusers'>
                                        <Io5Icons.IoPersonSharp />
                                            <span>{loggedin_user.role === 'employee' ? 'Clients': 'Users'}</span>
                                        </Link>
                                    </li>
                                    
                                    </>
                                )
                            }
                            {
                                loggedin_user.role === 'client' && (
                                    <li className = 'nav-text'>
                                        <Link to='/myinvoice'>
                                        <FaIcons.FaFileInvoiceDollar />
                                            <span>My Invoice</span>
                                        </Link>
                                    </li>
                                )
                            }
                            <li className = 'nav-text' style={{ color: '#ADEFD1FF' }}>
                                <a>
                                    <AiIcons.AiOutlineLogout />
                                    <button onClick={handleLogout}>Logout</button>
                                </a>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </IconContext.Provider>
    )
};

export default  Sidebar;
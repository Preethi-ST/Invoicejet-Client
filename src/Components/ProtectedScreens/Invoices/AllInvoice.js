import axios from 'axios'
import React, { useState,useEffect, useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Roles } from '../../../Roles'
import { InvoiceContext } from '../../Context/Context'
import '../../form.css'
import InvoiceList from './InvoiceList'
function AllInvoice() {
    const location = useLocation()
    const history = useHistory()
    const {loggedin_user} = useContext(InvoiceContext)
    const [searchStr,setsearchStr] = useState('')
    const [invoicelist,setInvoiceList] = useState([])
    const searchHandler = (e) => {
        e.preventDefault()
        
        searchStr ? history.push(`/allinvoices?invoiceno=${searchStr}`) : history.push(`/allinvoices`)
    }
    const getAllInvoiceData = async () => {
        console.log("in get invoice")
        await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/invoice/allinvoice${location.search}`)
       .then(res => setInvoiceList(res.data.invoices))
    }

    useEffect(() => {
       getAllInvoiceData() 
    }, [location.search])
    return (
        <div className='container-fluid p-3'>
            <form onSubmit={searchHandler} style={{display:'inline-block'}}>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="search Invoice" onChange = {(e)=>setsearchStr(e.target.value)}  />
            </div>
            </form>
            {
                (Roles.Admin || Roles.Manager || Roles.Employee) &&(
                    <Link to = '/addinvoice'>
                        <button type="button" class="btn btn-success btn-circle btn-lg float-right"><i class="fas fa-plus-circle"></i></button>
                    </Link>
                )
            }
            <hr />
            {
                invoicelist && (
                    <InvoiceList list = {invoicelist} />
                )
            }
        </div>
    )
}

export default AllInvoice

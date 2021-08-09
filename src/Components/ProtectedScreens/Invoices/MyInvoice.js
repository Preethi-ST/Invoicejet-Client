import axios from 'axios'
import React, { useState,useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { InvoiceContext } from '../../Context/Context'
import '../../form.css'
import InvoiceList from './InvoiceList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyInvoice() {
    const location = useLocation()
    const history = useHistory()
    const {loggedin_user} = useContext(InvoiceContext)
    const [searchStr,setsearchStr] = useState('')
    const [invoicelist,setInvoiceList] = useState([])
    const searchHandler = (e) => {
        e.preventDefault()
        
        searchStr ? history.push(`/myinvoice?invoiceno=${searchStr}`) : history.push(`/myinvoice`)
    }
    const getAllInvoiceData = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/invoice/myinvoice${location.search}`)
            .then(res => setInvoiceList(res.data.invoices))
        } catch (error) {
            console.log(error.response)
            history.push(`/myinvoice`)
            toast.error(error.response.data.message,{
                position: "top-right",
                autoClose: 5000
            })

        }
    }

    useEffect(() => {
       getAllInvoiceData() 
    }, [location.search])
    return (
        <div className='container-fluid p-3'>
            <ToastContainer />
            <form onSubmit={searchHandler} style={{display:'inline-block'}}>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="search Invoice" onChange = {(e)=>setsearchStr(e.target.value)}  />
            </div>
            </form>
            {console.log(invoicelist)}
            {
                invoicelist && (
                    <InvoiceList list = {invoicelist} />
                )
            }
        </div>
    )
}

export default MyInvoice

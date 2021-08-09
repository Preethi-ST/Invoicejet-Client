import React,{useContext} from 'react'
import '../../form.css'
import { InvoiceContext } from '../../Context/Context'
import { useHistory } from 'react-router'
import Pdf from './Pdf'
function InvoiceList({list}) {
    const {loggedin_user} = useContext(InvoiceContext)
    const history = useHistory()
    return (
        <table class="table borderless table-hover rounded">
            <thead>
                <tr style={{color:'darkblue'}}>
                    <th scope="col">Invoice</th>
                    <th scope="col">Client</th>
                    <th scope='col'>Product Quantity</th>
                    <th scope="col">Download</th>
                    {
                        (loggedin_user.role === 'admin' || loggedin_user.role === 'manager' || loggedin_user.role === 'employee') &&
                        <th scope="col">Action</th>
                    }
                </tr>
            </thead>
            <tbody style={{color : 'rgb(218, 31, 146)'}}>
                {
                    list.map((list,index) => {
                        return <tr key = {index}>
                            <th scope="row">{list.invoiceNo}</th>
                            <td>{list.clientName}</td>
                            <td>{list.products.length}</td>
                            <td><Pdf invoiceData= {list} /></td>
                            {
                                (loggedin_user.role === 'admin' || loggedin_user.role === 'manager' || loggedin_user.role === 'employee') &&
                                <td><button className='btn btn-sm btn-info' onClick={() => history.push(`/updateinvoice/${list.invoiceNo}`)}>Update</button></td>
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default InvoiceList

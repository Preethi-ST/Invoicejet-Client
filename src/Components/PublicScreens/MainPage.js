import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Layouts/Footer/Footer'
import './MainPage.css'
function MainPage() {
    return (
        <>
        <div className='main center-conent font'>
           <h2 style={{color : 'rgb(204, 84, 174)'}}>Getting paid shouldn't cost you</h2> 
            <p>Send professional invoices to your clients for free.</p>
            <p>Every invoice paid means more revenue coming into your small business. </p>
            <p>Create and send professional invoices to your customers in seconds.</p>
            <Link to='/contact'>
                <button className='btn btn-success'>contact us</button>
            </Link>
            
        </div>
        <Footer />
        </>
    )
}

export default MainPage

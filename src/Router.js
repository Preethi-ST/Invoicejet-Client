import React, { useContext } from 'react'
import { BrowserRouter , Switch, Route, Redirect } from 'react-router-dom';
import { Roles } from './Roles';
import { PrivateRoute } from './PrivateRoute';
import { InvoiceContext } from './Components/Context/Context';
import Footer from './Components/Layouts/Footer/Footer';
import Sidebar from './Components/Layouts/SideBar/Sidebar';
import Dashboard from './Components/ProtectedScreens/Dashboard';
import AddInvoice from './Components/ProtectedScreens/Invoices/AddInvoice';
import AllInvoice from './Components/ProtectedScreens/Invoices/AllInvoice';
import ActivateAccount from './Components/PublicScreens/ActivateAccount';
import Contact from './Components/PublicScreens/Contact';
import Error from './Components/PublicScreens/Error';
import ForgotPassword from './Components/PublicScreens/ForgotPassword';
import Login from './Components/PublicScreens/Login';
import MainPage from './Components/PublicScreens/MainPage';
import ResetPassword from './Components/PublicScreens/ResetPassword';
import MyInvoice from './Components/ProtectedScreens/Invoices/MyInvoice';
import AddUser from './Components/ProtectedScreens/Users/AddUser';
import AllUsers from './Components/ProtectedScreens/Users/AllUsers';
function Router() {
    const {loggedin_user} = useContext(InvoiceContext)
    console.log(loggedin_user)
    return (
        <BrowserRouter basename = '/Invoicejet'>
            <Sidebar /> 
            <div>
                <Switch>
                    {
                        !loggedin_user && (
                            <Route path = '/login' component = {Login} />
                        )
                    } 
                    <Route exact path = '/'>
                        <Redirect to = '/main' />
                    </Route>
                    <Route exact path = '/main' component={MainPage} />
                    <Route exact path = '/contact' component = {Contact} />
                    <Route exact path = '/activateaccount/:activateToken' component = {ActivateAccount} />
                    <Route exact path = '/forgotpassword' component = {ForgotPassword} />
                    <Route exact path = '/resetpassword/:resetToken' component ={ResetPassword} />
                    <Route exact path = '/error' component = {Error} />
                    
                    {
                        loggedin_user && (
                            <Switch>
                                <PrivateRoute exact path = '/dashboard' user = {loggedin_user} roles= {[Roles.Admin,Roles.Manager]} component = {Dashboard} />
                                <PrivateRoute exact path = '/allinvoices' roles= {[Roles.Admin,Roles.Manager,Roles.Employee]} user = {loggedin_user} component = {AllInvoice} />
                                <PrivateRoute exact path = '/addinvoice' roles= {[Roles.Admin,Roles.Manager,Roles.Employee]} user = {loggedin_user} component = {AddInvoice} />
                                <PrivateRoute exact path = '/updateinvoice/:invoiceNo' roles= {[Roles.Admin,Roles.Manager,Roles.Employee]} user = {loggedin_user} component = {AddInvoice} />
                                            
                                {/* MyInvoice is related to client specific Invoice - Where clients will have access only to their invoice */}
                                <PrivateRoute exact path = '/myinvoice' roles= {[Roles.Client,Roles.Admin,Roles.Manager,Roles.Employee]} user = {loggedin_user} component = {MyInvoice} />
                                            
                                {/*  In below routes employee will be able to add or view only clients, whereas Admin or Manager will have full access */}
                                <PrivateRoute exact path = '/allusers' roles= {[Roles.Admin,Roles.Manager,Roles.Employee]} user = {loggedin_user} component = {AllUsers} />
                                <PrivateRoute exact path = '/adduser' roles= {[Roles.Admin,Roles.Manager,Roles.Employee]} user = {loggedin_user} component = {AddUser} />
                            </Switch>
                        )
                    }
                    
                </Switch>
            </div>
            {
                !loggedin_user
                ?
                <Footer />
                :
                <></>
            }
        </BrowserRouter>
    )
}

export default Router

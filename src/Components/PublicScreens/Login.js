import {useContext} from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InvoiceContext } from '../Context/Context'
import FormControl from '../Formik/FormControl'
import './themes.css'
function Login() {
    const history = useHistory()
    const { dispatch } = useContext(InvoiceContext);
    
    const initialValues = {
        email : '',
        password : ''
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required'),
        password : Yup.string().required('Please Enter your password')
    })
    const onSubmit = async (values,onSubmitProps) => {
        dispatch({type:"LOGIN_START"})
        const {email,password} = values
        let toastify,msg;
        try{
            const result = await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/users/login`,{
                email,
                password
            })
            if(result.data.activateAccToken){
                history.push(`/activateaccount/${result.data.activateAccToken}`)
            } else{
                dispatch({type:'LOGIN_SUCCESS',payload : result.data.loggedin_user})
                result.data.loggedin_user.role === 'admin' || result.data.loggedin_user.role === 'manager'
                ?
                history.push('/dashboard')
                :
                result.data.loggedin_user.role === 'employee'
                ?
                history.push('/allinvoices')
                :
                history.push('/myinvoice')  //update as client specific invoices
                
            }
        }catch(error){
            dispatch({ type: "LOGIN_FAILURE" });
            msg = error.response.data.error || error;
            toastify = toast.error;
        }
        onSubmitProps.resetForm();
        toastify(msg,{
            position: "top-right",
            autoClose: 5000
        })
    }

    return (
        <>
          <ToastContainer />  
          <div className="container-fluid content-center img">
                    <div className="col-auto mb-3" style={{width:'18rem'}}>
                            <h5 className="text-center logo-text display-4">Login</h5>
                            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} validateOnMount>
                                {
                                    (formik) => (
                                        <Form>
                                            <FormControl control = 'input' type= 'email' label = 'Email' name='email' placeholder = 'Enter Email' />
                                            <FormControl control = 'input' type= 'password' label = 'Password' name='password' additional = 'forgotpassword' placeholder = 'Enter Password' />
                                            <button type='submit'  className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} disabled= {!(formik.isValid)} >Login</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <span className='small text-white'>
                                New User ?    
                                <Link to='/contact' style={{ textDecoration: 'none' }}>   Contact</Link> 
                            </span>
                            
                    </div>
            </div>
            
        </>
    )
}

export default Login

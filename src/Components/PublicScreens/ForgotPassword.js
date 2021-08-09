import {useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '../Formik/FormControl'
import './themes.css'

function ForgotPassword() {
    const initialValues = {
        email : ''
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required')
    })
    const onSubmit = async (values) => {
        const {email} = values
        let toastify,msg;
        try {
            await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/users/forgotPassword`,{email})
            .then(res => {
                toastify = toast.success;
                msg = res.data.message
            })
        } catch (error) {
            toastify = toast.error;
            msg = error.response.data.error
        }
        toastify(msg,{
            position: "top-right",
            autoClose: 5000
        })
        onSubmitProps.resetForm()
    }
    return (
        <>
          <ToastContainer />  
          <div className="container-fluid content-center img">
                    <div className="col-auto mb-3" style={{width:'21.5rem'}}>
                            <h5 className="text-center logo-text display-4">Forgot Password</h5>
                            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} validateOnMount>
                                {
                                    (formik) => (
                                        <Form>
                                            <FormControl control = 'input' type= 'email' label = 'Email' name='email' placeholder = 'Enter Email' />
                                            <button type='submit'  className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} disabled= {!(formik.isValid)} >Mail Me</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <span className='small text-white'>
                                Remember Password ?    
                                <Link to='/contact' style={{ textDecoration: 'none' }}>   Login</Link> 
                            </span>
                    </div>
            </div>
            
        </>
    )
}

export default ForgotPassword

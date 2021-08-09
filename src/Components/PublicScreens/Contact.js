import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '../Formik/FormControl';
import './themes.css'
import '../form.css'
import axios from 'axios';
function Contact() {
    const initialValues = {
        email : ''
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required')
    })
    const onSubmit = async (values,onSubmitProps) => {
        const {email} = values
        try {
            await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/users/contact`,{email})
            toast('Mail Sent! We will contact you soon',{
                position: "top-right",
                autoClose: 5000
            })
        } catch (error) {
            toast.error('Issue in sending Mail. Try after sometime',{
                position: "top-right",
                autoClose: 5000
            })
        }
        onSubmitProps.resetForm()
    }
    return (
        <div className="container-fluid content-center img">
            <div className="col-auto mb-3" style={{width:'18rem'}}>
                <h5 className='text-center display-4 logo-text'>Mail Us</h5>
                <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} validateOnMount>
                    {
                        (formik) => (
                            <Form>
                                <FormControl control = 'input' type= 'email' label = 'Email' name='email' placeholder = 'Enter your Email' />
                                <button 
                                    type='submit'  
                                    className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} 
                                    disabled= {!(formik.isValid)}
                                >
                                    send
                                </button>
                            </Form>
                        )
                    }
                </Formik>
            </div>            
        </div>
    )
}

export default Contact

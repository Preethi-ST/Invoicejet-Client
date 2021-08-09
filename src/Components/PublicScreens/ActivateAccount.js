import { useHistory,useParams } from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '../Formik/FormControl'
import './themes.css'

function ActivateAccount() {
    const history = useHistory();
    const activateToken = useParams();
    const initialValues = {
        password : '',
        confirmpassword : ''
    }
    const validationSchema = Yup.object({
        password : Yup.string()
            .required('Enter your password')
            .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        confirmpassword : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const onSubmit = async (values) => {
        const {password} = values
        let toastify,msg;
        try {
            await axios.put(`${process.env.REACT_APP_BE_SERVER_URL}/api/users/activateAccount/${activateToken.activateToken}`,{password})
            .then(res => {
                toastify = toast.success;
                msg = 'Account Activated'
            })
        } catch (error) {
            toastify = toast.error;
            msg = error.response.data.error
        }
        toastify(msg, {
            position: "top-right",
            autoClose: 3000
        });
        setTimeout(() => {
            history.push('/login')
        }, 3000);
    }
    return (
        <>
          <ToastContainer />  
          <div className="container-fluid content-center img">
 
                    <div className="col-auto mb-3" style={{width:'22rem'}}>
                            <h5 className="text-center logo-text display-4">Change Password</h5>
                            <Formik initialValues = {initialValues} validationSchema = {validationSchema} onSubmit= {onSubmit} validateOnMount>
                                {
                                    (formik) => (
                                        <Form>
                                            <FormControl control = 'input' type= 'password' label = 'Password' name='password' />
                                            <FormControl control = 'input' type= 'password' label = 'Confirm Password' name='confirmpassword' />
                                            <button type='submit'  className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} disabled= {!(formik.isValid)} >Reset</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                            <span className='small text-white'>
                                Remember Password ?    
                                <Link to='/login' style={{ textDecoration: 'none'}}>   Login</Link> 
                            </span>
                       {/*  </div> */}
                    </div>
                </div>
            
        </>
    )
}

export default ActivateAccount

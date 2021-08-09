import React,{useContext} from 'react'
import {Formik,Form} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormControl from '../../Formik/FormControl'
import '../../form.css'
import axios from 'axios';
import { InvoiceContext } from '../../Context/Context'
import { useHistory } from 'react-router';
function AddUser() {
    const {loggedin_user} = useContext(InvoiceContext)
    const history = useHistory()
    let roleOptions;
    const initialValues = {
        fname : '',
        lname : '',
        email : '',
        password : '',
        confirmpassword : '',
        role : '',
        address : {
            door : '',
            city : '',
            state : '',
            zip : ''
        }
    }
    /* If loggedin user is employee then they can add only clients.
       Manager or Admin can add Admin or Manager
    */
    if(loggedin_user.role === 'employee'){
        roleOptions = [{
            key : 'client',value : 'client'
        }]
    }else{
        roleOptions = [
            {key :'admin',value : 'admin'},
            {key : 'manager',value : 'manager'},
            {key :'employee',value : 'employee'},
            {key : 'client',value : 'client'}
        ]
    }
    const validationSchema = Yup.object({
        fname : Yup.string().required('FirstName is required'),
        lname : Yup.string().required('LastName is required'),
        email : Yup.string().email('Enter valid email').required('Email is required'),
        password : Yup.string()
        .required('Please Enter your password')
        .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
        confirmpassword : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        role : Yup.string().required('Role is required'),
        address : Yup.object().when('role',{
            is : 'client',
            then : Yup.object({
                door : Yup.string().required('Door is required'),
                city : Yup.string().required('City is required'),
                state : Yup.string().required('State is required'),
                zip : Yup.string().required('Zip is required')
            })
        })
    })
    const onSubmit = async (values,onSubmitProps) => {
        let toastify,msg;
        try {
            const {fname,lname,email,password,role,address} = values
            const result = await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/users/register`,{fname,lname,email,password,role,address})
            toastify = toast.success
            msg = result.data.message
            setTimeout(() => {
                history.push('/allusers')
            }, 2000);
        } catch (error) {
            toastify = toast.error
            msg = error.response.data.error
        }
        onSubmitProps.resetForm()
        toastify(msg,{
            position: "top-right",
            autoClose: 5000
        })
    }
    return (
        <div className="container-fluid content-center registerimg">
            <div className="col-auto mb-3" style={{width:'18rem'}}>
                <ToastContainer />
                <h4 className='text-success'>New User Registration</h4>
                <hr />
                <Formik initialValues={initialValues} validationSchema = {validationSchema} onSubmit = {onSubmit} validateOnMount>
                    {
                        (formik) => (
                            <Form style={{width : '100%'}}>
                                <FormControl control = 'input' type= 'text' label = 'FirstName' name='fname' placeholder='Enter FirstName'  />
                                <FormControl control = 'input' type= 'text' label = 'LastName' name='lname' placeholder='Enter LastName' />
                                <FormControl control = 'input' type = 'email' label = 'Email' name='email' placeholder='Enter Email' />
                                <FormControl control = 'input' type = 'password' label = 'Password' name='password' placeholder = 'Enter Password' />
                                <FormControl control = 'input' type = 'password' label = 'ConfirmPassword' name='confirmpassword' placeholder = 'Retype Password' />
                                <FormControl control = 'select' type = 'text' label = 'Role' name='role' placeholder = 'select role' options = {roleOptions}  />
                                {/* If selected role is client, then address of the clients need to be collected */}
                                {
                                    formik.values.role === 'client' && (
                                        <>
                                        <label className='logo-text'>Client Address</label>
                                        <FormControl control = 'input' type = 'text' label = 'Door' name='address.door' placeholder='Door' />
                                        <FormControl control = 'input' type = 'text' label = 'City' name = 'address.city' placeholder = 'City' />
                                        <FormControl control = 'input' type = 'text' label = 'State' name = 'address.state' placeholder = 'State' />
                                        <FormControl control = 'input' type = 'text' label = 'Zip' name = 'address.zip' placeholder = 'Zip' />
                                        </>
                                    )
                                }
                                <button type='submit'  className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} disabled= {!(formik.isValid)} style={{width: '100px'}} >Create</button>
                            </Form>
                        )
                    }
                </Formik>
                
            </div>

        </div>
    )
}

export default AddUser

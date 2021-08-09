import React,{useEffect, useState} from 'react'
import {Formik,Form,FieldArray} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InlineFormControl from '../../Formik/InlineFormControl'
import FormControl from '../../Formik/FormControl'
import '../../form.css'
import axios from 'axios';
import { useHistory,useParams } from 'react-router-dom';
function AddInvoice() {
    const history = useHistory();
    /* Code gets executed fot edit invoice */

    /* checking whether EDIT or CREATE */
    const [updateInvoice,setUpdateInvoice] = useState(undefined)
    const pathFlag = history.location.pathname.includes('updateinvoice') ? 1 : 0;
    /* Code gets executed when user is on - EDIT */
    const invoiceNo = useParams();
    const getInvoiceData = async () => {
        let invoice_to_be_updated = await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/invoice/getInvoice/${invoiceNo.invoiceNo}`)
        setUpdateInvoice(invoice_to_be_updated.data.invoice)
    }

    useEffect(() => {
        if(pathFlag){
            getInvoiceData()
        }
       
    }, [pathFlag])
    
    const initialValues = {
        invoiceNo : updateInvoice?.invoiceNo,
        products : updateInvoice?.products || [{
            description : '',
            quantity : '',
            tax : '',
            price : ''
        }],
        email : updateInvoice?.clientEmail|| ''
    }
    
    const validationSchema = Yup.object({
        email : Yup.string().email('Enter valid email').required('Email is required'),
        products: Yup.array().of(
            Yup.object().shape({
                description: Yup.string().required("Product Name is required"),
                quantity: Yup.number().required("Quantity required"),
                tax : Yup.number().required('Tax is required'),
                price : Yup.number().required('Price is required')
            })
        )
    })
    const onSubmit = async (values,onSubmitProps) => {
        if(!pathFlag){
            const {products,email} = values
            try {
                await axios.post(`${process.env.REACT_APP_BE_SERVER_URL}/api/invoice/create`,{products,clientEmail:email})

                toast.success('Invoice Created',{
                    position: "top-right",
                    autoClose: 3000
                })
                setTimeout(() => {
                    history.push('/allinvoices')
                }, 2000);
            } catch (error) {
                const error_msg = error.response.data.error
                toast.error(error_msg,{
                    position: "top-right",
                    autoClose: 3000
                })
            }
        }else{
           try {
                const {products} = values
                await axios.patch(`${process.env.REACT_APP_BE_SERVER_URL}/api/invoice/update/${invoiceNo.invoiceNo}`,{products})
                .then(res => console.log(res.data.invoice))
                toast.success('Invoice Updated',{
                    position: "top-right",
                    autoClose: 3000
                })
                setTimeout(() => {
                    history.push('/allinvoices')
                }, 2000); 
           } catch (error) {
                const error_msg = error.response.data.error
                toast.error(error_msg,{
                    position: "top-right",
                    autoClose: 3000
                })
           }

        }
        onSubmitProps.resetForm()
    }
    return (
        <div className='container-fluid p-3'>
            <ToastContainer />
            <h4 className='text-success'>{pathFlag ? 'Update' : 'New'} Invoice</h4>
            <hr />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize validateOnMount>
                {
                    (formik) => (
                        <Form style={{width:'100%'}}>
                            {
                                updateInvoice  && (
                                    <FormControl control = 'input' type= 'text' label = 'Invoice Number' name='invoiceNo' disabled = {true}  />
                                )
                            }
                            <div class="col-md-8 col-xs-12 mb-3"> 
                                <label className='logo-text' style={{fontSize:'1.5rem'}}>Products</label> 
                                <FieldArray name = 'products'>
                                    {
                                        (fieldArrayProps) => {
                                            const {push,remove,form} = fieldArrayProps
                                            const {values} = form
                                            const {products} = values   
                                            return <>
                                                {
                                                    products.map((products,index) => (
                                                        <div class="row" key = {index}>
                                                            <InlineFormControl control='input' type='text' label = 'Product Name' name = {`products[${index}].description`}  />
                                                            <InlineFormControl control='input' type='number' label = 'Quantity' name = {`products[${index}].quantity`}  />
                                                            <InlineFormControl control='input' type='number' label = 'Tax' name = {`products[${index}].tax`}  />
                                                            <InlineFormControl control='input' type='number' label = 'Price' name = {`products[${index}].price`}  />
                                                            {
                                                                index > 0 && (  
                                                                    <button type="button" class="btn-danger btn-circle"  onClick={()=>remove(index)}><i class="fas fa-minus-circle"></i></button>
                                                                ) 
                                                            } 
                                                            <button 
                                                                type="button"
                                                                className = 'btn-circle btn-success' 
                                                                onClick = {()=>push({name : '',quantity : '',tax : '',price : ''})}>
                                                                <i class="fas fa-plus-circle"></i>
                                                            </button> 
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        }
                                    }
                                </FieldArray>
                            </div>
                            <FormControl control = 'input' type= 'email' label = 'Email' name='email' placeholder = 'Enter Email' disabled = {updateInvoice  ? true : false} />
                            <button type='submit'  className={`btn btn-block btn-success ${!(formik.isValid) ? 'not-allowed' : ''}`} disabled= {!(formik.isValid)} style={{width: '100px'}} >{pathFlag ? 'Update' : 'Submit'}</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default AddInvoice

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const easyinvoice = require('easyinvoice');

toast.configure();
export default function Pdf({invoiceData}){
    let today = new Date().toLocaleDateString()

    var data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
        "currency": "USD", //See documentation 'Locales and Currency' for more info
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://res.cloudinary.com/krishcloudstorage/image/upload/v1628445018/dev_setups/afsnb6lsigzo4tzzllme.png", //or base64
        "sender": {
            "company":"Invoicejet",
            "address": "D56 Developed Plot Estate, Thuvakudi",
            "zip": "620015",
            "city": "Tiruchirappalli",
            "country": "Tamilnadu",
            
        },
        "client": {
               "company": invoiceData.clientName,
               "address": invoiceData.address.door,
               "zip": invoiceData.address.zip,
               "city": invoiceData.address.city,
               "country": invoiceData.address.state
        },
        "invoiceNumber": invoiceData.invoiceNo,
        "invoiceDate": today,
        "products": invoiceData.products   
        ,
        "bottomNotice": "Thank you for your purchase!!!",
    };
  
let invoice = () => {
    
    //Create your invoice! Easy!
    easyinvoice.createInvoice(data, async function (result) {
        easyinvoice.download(`${invoiceData.invoiceNo}.pdf`);
    });
    toast(`Invoice ${invoiceData.invoiceNo} started downloading!`);

}

return <><button className="btn btn-sm btn-success" onClick={invoice}>Download <i class="fas fa-arrow-circle-down"></i></button></>
    

}
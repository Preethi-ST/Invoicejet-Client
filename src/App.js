import './App.css';
import axios from 'axios';
import {InvoiceContextProvider} from './Components/Context/Context'
import Router from './Router';
axios.defaults.withCredentials = true;

function App() {
  return (
    <InvoiceContextProvider>
      <Router />
    </InvoiceContextProvider>
  );
}

export default App;

import axios from 'axios'
import React, { useEffect,useReducer } from 'react'
import Reducer from './Reducer'

const INITIAL_STATE = {
    loggedin_user : null,
    isFetching : false,
    error : false
}

export const InvoiceContext = React.createContext(INITIAL_STATE)

export const InvoiceContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(Reducer,INITIAL_STATE)
    const checkLoggedIn = async () => {
        const loggedIn = await axios.get(`${process.env.REACT_APP_BE_SERVER_URL}/api/users/isLoggedIn`)
        loggedIn.data.success 
        ?
        dispatch({type : 'LOGIN_CHECK_SUCCESS',payload : loggedIn.data.loggedin_user})
        :
        dispatch({type : 'LOGIN_CHECK_FAILURE'})
    } 
    useEffect(() => {
        checkLoggedIn()
        return () => {
            <></>
        }
    }, [])

    return (
        <InvoiceContext.Provider value = {{
            loggedin_user : state.loggedin_user,
            isFetching : state.isFetching,
            error : state.error,
            dispatch,
            checkLoggedIn
        }}>
            {children}
        </InvoiceContext.Provider>
    )
}
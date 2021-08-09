import React from 'react'
import {Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ( {
    component : Component,roles,user,  ...rest } 
) => (
    <Route {...rest} render = {(props) => {

        console.log(user)

       if(!user){
            return <Redirect to = '/login' />
        }

        if(roles && roles.indexOf(user.role)=== -1){
            return <Redirect to = '/error' />
        }
        return <Component {...props} /> 

    }} />
)
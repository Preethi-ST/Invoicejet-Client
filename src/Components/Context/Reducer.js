const Reducer = (state,action) => {
    switch(action.type){
        case 'LOGIN_START' :
            return {
                loggedin_user :null,
                isFetching : true,
                error : false
            }
        case 'LOGIN_SUCCESS' : 
            return {
                loggedin_user : action.payload,
                isFetching : false,
                error : false
            }
        case 'LOGIN_FAILURE' :
            return {
                loggedin_user : null,
                isFetching : false,
                error : false
            }
        case 'LOGIN_CHECK_SUCCESS' :
            return {
                loggedin_user : action.payload,
                isFetching : false,
                error : false
            }
        case 'LOGIN_CHECK_FAILURE' :
            return {
                loggedin_user : null,
                isFetching : false,
                error : false
            }
        case 'LOGOUT' :
            return {
                loggedin_user : null,
                isFetching : false,
                error : false
            }
        default :
            return state;
    }
}

export default Reducer
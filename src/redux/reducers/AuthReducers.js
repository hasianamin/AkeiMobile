const INITIAL_STATE = {
    user_id:0,
    username:'',
    email: '',
    isLogin: false,
    isLoading: false,
    cartLength: 0
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN':
            return {...state,isLogin:true,...action.payload,isLoading:false}
        case 'LOADING':
            return {...state,isLoading:true}
        case 'ERROR':
            return {...state,isLoading:false}
        case 'ADD':
            return {...state,cartLength:action.payload}
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return state;
    }
}
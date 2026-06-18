import Register from '../Pages/Auth/Register';
import api from './api' ;

const authService = {

    // login 

    login : async(loginData) => {
        try{
            const response = await api.post('auth/login',loginData) ;

            localStorage.setItem('token',response.data.token) ;

            localStorage.setItem('user',JSON.stringify(response.data)) ;

            return response.data ;
        }catch(error){
            console.log('login erroer :', error);
            throw error ;
        }
    },

    register: async(registerData) => {
        try{
            const response = await api.post('auth/register',registerData) ;
            return response.data ;
        }catch(error){
            console.log('register erroer :', error);
            throw error ;
        }

    },

    getCurrentUser : () => {
        try{
            const user = localStorage.getItem('user') ;
            return user ? JSON.parse(user) : null ;
        }catch(error){
            console.log('user Parse erreur ', error);
            return null ;
        }
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    logout: () => {
        localStorage.clear(); 
    }
};

export default authService;


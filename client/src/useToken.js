import { useState } from 'react';

export default function useToken() {
    const [token, setToken] = useState(getToken());

    function getToken () {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };


    function saveToken (userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}
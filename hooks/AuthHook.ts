import { useState, useEffect, useCallback } from 'react';


export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [isReady, setIsReady] = useState(false);

	const login = useCallback((jwtToken) => {
		setToken(jwtToken);
		localStorage.setItem(
			'accessToken',
			jwtToken
		);
	}, []);

	const logout = () => {
		setToken(null);
		localStorage.removeItem('accessToken');
	};

	useEffect(() => {
        if(localStorage.getItem('accessToken')) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                login(token);
            }
            setIsReady(true);
        }
	}, [login]);
	return { login, logout, token, isReady };
};


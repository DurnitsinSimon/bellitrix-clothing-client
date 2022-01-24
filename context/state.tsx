import { createContext, FC, useContext } from 'react';
import { useAuth } from '../hooks/AuthHook';


interface authContext {
    login: (jwtToken: string) => void;
    logout: () => void;
    token: string | null;
    isReady: boolean;
}

const authContextDefaultValues: authContext = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    login: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    logout: () => {},
    token: null,
    isReady: false,
};

const AuthContext = createContext<authContext>(authContextDefaultValues);

const AuthProvider: FC = ({ children }) => {
	const { login, logout, token, isReady } = useAuth();

	const sharedState = {
		login,
		logout,
		token,
		isReady,
	};

	return (
        <>
            <AuthContext.Provider value={sharedState}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export function useAuthContext() {
    return useContext(AuthContext);
}

export default AuthProvider;

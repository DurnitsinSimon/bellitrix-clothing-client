import type { AppProps } from 'next/app';
import '../styles/NullStyles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from '../context/state';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;

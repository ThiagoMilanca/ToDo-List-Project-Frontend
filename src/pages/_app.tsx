import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '../components/navbar/navbar';
import { AuthProvider } from '../AuthContext';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <AuthProvider>
            <Navbar />
            <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}

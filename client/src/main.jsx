import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const AppWrapper = ({ children }) =>
    googleClientId
        ? <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>
        : <>{children}</>;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppWrapper>
            <BrowserRouter>
                <ThemeProvider>
                    <AuthProvider>
                        <App />
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 3000,
                                style: {
                                    borderRadius: '14px',
                                    background: '#1e293b',
                                    color: '#f8fafc',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    padding: '12px 16px',
                                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)',
                                },
                                success: {
                                    iconTheme: { primary: '#10b981', secondary: '#fff' },
                                },
                                error: {
                                    iconTheme: { primary: '#ef4444', secondary: '#fff' },
                                },
                            }}
                        />
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </AppWrapper>
    </React.StrictMode>
);


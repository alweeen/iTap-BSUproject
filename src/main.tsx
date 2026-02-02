import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <App />
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#fff',
                            color: '#36454F',
                            borderRadius: '1rem',
                            padding: '1rem',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#98FF98',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

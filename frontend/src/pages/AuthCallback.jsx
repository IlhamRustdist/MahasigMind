import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logClientEvent } from '../utils/logger';

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            logClientEvent('AUTH_STATE_CHANGE', { status: 'login', provider: 'google' });
            login(token);
            navigate('/home');
        } else {
            navigate('/login');
        }
    }, [searchParams, login, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500 font-medium">Memproses login...</p>
            </div>
        </div>
    );
}

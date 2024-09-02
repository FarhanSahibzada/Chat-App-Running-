import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import Logim from './Login';

function Loading() {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const userid = await localStorage.getItem("useruid");

            if (userid) {
                navigate('/home');
            } else {
                navigate('/Login');
            }
        };

        setTimeout(() => {
            setLoading(false);
            checkUser();
        }, 1000);
    }, [navigate]);

    if (loading) {

        return (

            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                <p className="mt-4 text-blue-500 text-lg">Loading...</p>
            </div>
        )
    }
}

export default Loading
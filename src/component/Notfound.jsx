
import React, { useEffect } from 'react';


const NotFound = () => {

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-500">404</h1>
                <p className="text-2xl text-gray-700 mt-4">Oops! Page not found.</p>
                <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default NotFound;
import React, { useState } from 'react'
import bgimage from '../image/bg1.webp'
import "../index.css"
import { useNavigate } from 'react-router-dom'
import { collection, setDoc, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from './firebase/firebase';
import { auth } from './firebase/firebase';

function Sign() {
    const navigate = useNavigate();
    let [name, setName] = useState('');
    let [Email, setEmail] = useState('');
    let [password, setpassword] = useState('');
    let [loading, setLoading] = useState(false);

    let create = async () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, Email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("useruid", user.uid);
                await addDoc(collection(db, "users"), {
                    name: name,
                    email: Email,
                    useruid: user.uid
                })

                setName("");
                setEmail("")
                setpassword("")
                setLoading(false)
                navigate('/Home')
            })
            .catch((error) => {
                setLoading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <div className='main min-h-screen flex justify-center items-center' style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='inner p-8 rounded-lg shadow-lg bg-white bg-opacity-70'>
                <h2 className='text-2xl font-bold text-center '>Sign In</h2>
                {loading ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                ) :(
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        create();
                    }}>
                    <div className="mb-4 mt-4">
                        <label
                            htmlFor="name"
                            className="text-gray-700 text-sm font-bold mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="text"
                            placeholder="Enter your Name"
                            className="shadow  border rounded ms-10 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4 mt-4">
                        <label
                            htmlFor="email"
                            className="text-gray-700 text-sm font-bold mb-2"
                            >
                            Email Address
                        </label>
                        <input
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="shadow  border rounded ms-4 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="text-gray-700 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="shadow  border rounded ms-12 py-2 px-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button type='submit' className='w-full text-center font-bold text-1xl bg-indigo-600 text-white py-3 rounded-lg active:bg-blue-500'>Sign in</button>
                </form>
                )}
                <h2 className='text-center  mt-6'>Already have an <span className='text-indigo-600 font-bold cursor-pointer' onClick={() => {
                    navigate("/Login")
                }}>Account</span></h2>
            </div>
        </div>
    )
}

export default Sign

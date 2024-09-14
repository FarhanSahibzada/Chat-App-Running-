import React, { useEffect, useState } from 'react'
import backimage from '../image/back.png'
import dpimage from '../image/dp.png'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase/firebase'
import { db } from './firebase/firebase'
import { storage } from './firebase/firebase'
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


function Profile() {
    let navigate = useNavigate();
    const [activesite, setactivesite] = useState('about');
    const [image, setimage] = useState(dpimage)
    const [db_id, setdb_id] = useState("")
    // logout 
    let logout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("useruid");
                navigate('/Login');
            })
            .catch((error) => {
                console.error("Logout error: ", error);
            })
    }

    const [userData, setUserData] = useState({
        name: '',
        bio: '',
        // email: '',
        age: '',
        contact: '',
        country: ''
    })
    const [editData, setEditData] = useState({ ...userData });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const updatedata = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            let q = query(collection(db, "users"), where("useruid", "==", user.uid));
            let userdoc = await getDocs(q)
            userdoc.forEach(async (e) => {

                const userRef = doc(db, "users", e.id);
                await updateDoc(userRef, editData);
            });

            setEditData({
                name: '',
                bio: '',
                // email: '',
                age: '',
                contact: '',
                country: ''
            })
            setactivesite("about")
            alert("update successfully ")

        } catch (error) {
            console.error("Error updating profile: ", error);
            alert("Error updating profile");
        }
    };
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(collection(db, "users"), where("useruid", "==", user.uid));
                const unsubFirestore = onSnapshot(q, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setdb_id(doc.id);
                        setUserData(doc.data())
                        setEditData(doc.data())
                    });
                });

                return () => unsubFirestore();
            } else {
                console.log("User is not logged in.");
            }
        });

        return () => unsubscribeAuth();
    }, []);


    let handleimage = (e) => {
        const user = auth.currentUser;
        const file = e.target.files[0];

        if (file && user) {
            const uid = user.uid;
            const storageref = ref(storage, `images/${uid}/dp`);

            uploadBytes(storageref, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setimage(url)
                    updateDoc(doc(db, "users", db_id), {
                        profileimage: url,
                    })
                    alert("image uploaded successfully")
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            }).catch((error) => {
                console.error('Error uploading file:', error);
            });
        } else {
            console.error('No file selected or no user is signed in');
        }
    }
    return (
        <div>
            <div className=' w-full flex justify-between items-center flex-wrap  bg-red-600  shadow-lg'>
                <h2 className='text-white py-3 px-4 font-bold text-2xl'>Profile</h2>
                <div className='flex justify-start items-center flex-wrap gap-1'>
                    <h2 className='text-white py-3 px-4 font-bold text-base cursor-pointer' onClick={() => {
                        navigate("/Myshop")
                    }}>MarketPlace</h2>
                    <h2 className='text-white py-3 px-4 font-bold text-base cursor-pointer' onClick={() => {
                        navigate("/Home")
                    }}>Chats</h2>
                </div>
                <button className='text-white  font-bold me-4 rounded-2xl px-2' onClick={logout}>Logout</button>
            </div>

            <div className='bg-gray-200  h-[91vh] overflow-x-hidden'>
                <img src={backimage} alt="" className='bg-slate-300 rounded-full p-3 w-12 ms-3  mt-3 cursor-pointer' onClick={() => {
                    navigate("/Home")
                }} />

                <div className='main flex justify-evenly items-start flex-wrap gap-1'>
                    <div className='profilepic flex justify-center '>
                        <label htmlFor="image" className='cursor-pointer hover:opacity-35 '>
                            <img src={userData.profileimage || dpimage} alt="" className='w-[250px] rounded-full h-[250px] border-2 p-1' />
                        </label>
                        <input
                            type="file"
                            id="image"
                            style={{ display: 'none' }}
                            onChange={handleimage}
                        />
                    </div>
                    <div className='profiledata w-[50%]'>
                        <h2 className='text-4xl font-bold text-blue-500'>{userData.name || "your name"}</h2>
                        <h2 className='text-xl font-bold mt-2'>{userData.bio || "add bio"}</h2>
                        <div className='flex justify-start gap-4 items-end w-[100%]  h-[22vh] '>
                            <h2 className={`text-xl text-gray-500 font-semibold cursor-pointer py-1 px-2 rounded-full ${activesite == "about" ? "text-blue-500 underline " : "text-gray-500"}`} onClick={() => setactivesite('about')}>About</h2>
                            <h2 className={`text-xl  text-gray-500 font-semibold cursor-pointer py-1 px-2 rounded-full ${activesite == 'update' ? "text-blue-500 underline" : "text-gray-500"}`} onClick={() => setactivesite('update')}>Update Profile</h2>
                        </div>
                        {activesite === "about" && (
                            <div className='about-section'>
                                <ul className='mt-4'>
                                    <li className='mb-1 text-xl font-semibold'>username : <strong className='text-blue-500 '>{userData.name}</strong></li>
                                    <li className='mb-1 text-xl font-semibold'>Email : <strong className='text-blue-500 '>{userData.email}</strong></li>
                                    <li className='mb-1 text-xl font-semibold'>Age : <strong className='text-blue-500 '>{userData.age || "--"}</strong></li>
                                    <li className='mb-1 text-xl font-semibold' >Contact : <strong className='text-blue-500 '>{userData.contact || "--"}</strong></li>
                                    <li className='mb-1 text-xl font-semibold'>Country : <strong className='text-blue-500 '>{userData.country || "--"}</strong></li>
                                </ul>
                            </div>
                        )}

                        {activesite === "update" && (
                            <div className='update-section'>
                                <form onSubmit={updatedata} className='mt-4'>
                                    <div className='mb-4'>
                                        <label className='block text-lg'>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleInputChange}
                                            placeholder='New Name'
                                            className='border-2 bg-transparent rounded-full  p-2 w-full'
                                            required
                                        />
                                    </div>
                                    {/* <div className='mb-4'>
                                        <label className='block text-lg'>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editData.email}
                                            onChange={handleInputChange}
                                            placeholder='New Email'
                                            className='border-2 bg-transparent rounded-full  p-2 w-full'
                                            required
                                        />
                                    </div> */}
                                    <div className='mb-4'>
                                        <label className='block text-lg'>Bio</label>
                                        <input
                                            type="text"
                                            name="bio"
                                            value={editData.bio}
                                            onChange={handleInputChange}
                                            placeholder='New Bio'
                                            className='border-2 bg-transparent rounded-full  p-2 w-full'
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block text-lg'>Age</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={editData.age}
                                            onChange={handleInputChange}
                                            placeholder='New Age'
                                            className='border-2 bg-transparent rounded-full  p-2 w-full'
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block text-lg'>Contact</label>
                                        <input
                                            type="text"
                                            name="contact"
                                            value={editData.contact}
                                            onChange={handleInputChange}
                                            placeholder='New Contact'
                                            className='border-2 bg-transparent rounded-full  p-2 w-full'
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block text-lg'>Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={editData.country}
                                            onChange={handleInputChange}
                                            placeholder='New Country'
                                            className='border-2 bg-transparent rounded-full  p-2 w-full'
                                            required
                                        />
                                    </div>
                                    <button type="submit" className='bg-blue-500 text-white p-2 rounded'>Update Profile</button>
                                </form>
                            </div>
                        )}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Profile
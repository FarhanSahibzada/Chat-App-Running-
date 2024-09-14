import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'



function Location() {
    const [userLocation, setuserLocation] = useState({ lat: 0, lng: 0 });
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setuserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                    setloading(false)
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    setloading(false)
                }
            )
        } else {
            alert("Browser does not support yout location")
            setloading(false)
        }
    }, [])

    return (
        <div className=' overflow-hidden'>
            <h1 className='bg-red-600 p-4 text-white font-bold text-xl  fixed top-0 w-full z-50'>My Location</h1>
            <div className='p-4 mt-14 grid place-items-center bg-base-300 '>
            <LoadScript googleMapsApiKey="AIzaSyCduUlfEdipLTGF-sCizDO488Xm8gExsAA">
                <GoogleMap
                    mapContainerStyle={{ height: "100vh", width: "90vw", borderWidth:4 , borderColor : "red", borderRadius : "20px",}}
                    center={userLocation}
                    zoom={12}
                    >
                    {!loading && <Marker position={userLocation} label="You are here" />}
                </GoogleMap>
            </LoadScript>
                    </div>
        </div>
    );
}


export default Location
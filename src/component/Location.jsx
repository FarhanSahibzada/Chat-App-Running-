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
        <LoadScript googleMapsApiKey="AIzaSyCduUlfEdipLTGF-sCizDO488Xm8gExsAA">
            <GoogleMap
                mapContainerStyle={{ height: "70vh", width: "100vw" }}
                center={userLocation}
                zoom={12}
            >
                {!loading && <Marker position={userLocation} label="You are here" />}
            </GoogleMap>
        </LoadScript>
    );
}


export default Location
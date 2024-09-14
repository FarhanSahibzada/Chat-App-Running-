import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import backimage from '../image/back.png'

function Cartshow() {
    let { state } = useLocation()
    let navigate = useNavigate();
    const [add, setadd] = useState([]);

    let addtocart = (vul) => {
        setadd([vul.id])
        let v = JSON.parse(localStorage.getItem("addCart"));
        if (v !== null) {
            v = Array.isArray ? v : [v];
            v.push(vul)
            localStorage.setItem("addCart", JSON.stringify(v));
        } else {
            localStorage.setItem("addCart", JSON.stringify([vul]));
        }

        setTimeout((e) => {
            setadd([]);
        }, 1000);
    }

    console.log(state)
    return (
        <div className='bg-base-200 ' >
            <img src={backimage} alt="" className='bg-slate-300 rounded-full   p-4 w-14 ms-3  cursor-pointer' onClick={() => {
                navigate("/Myshop")
            }} />
            <div className="hero bg-base-200 min-h-screen w-full">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={state.api_featured_image}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <p className="text-2xl   ">{state.description}                      </p>
                        <strong className=' text-blue-600  block  mt-3'>Category: {state.category}</strong>
                        <strong className=' text-blue-600  block  mt-1'>Brand: {state.brand}</strong>
                        <strong className=' text-blue-600  block border-b-2 mt-1 border-red-500 pb-4'>Website: {state.website_link}</strong>
                        <h1 className="py-6 text-3xl font-semibold">
                            {state.name}
                        </h1>
                        <p className="text-lg font-semibold text-orange-500">price: ${state.price}</p>
                        <div className='flex gap-1 flex-wrap mb-2 mt-2'>
                            <strong >Colours : </strong>
                            {state.product_colors.map((col, index) => (
                                <div key={index} className={`w-6 h-6 `} style={{ backgroundColor: col.hex_value }}>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end gap-3 '>
                            <button className="btn bg-yellow-500 shadow-lg text-white font-bold"
                                onClick={() => { addtocart(state) }}>
                                {add.includes(state.id) ? '✔' : 'Add to Cart'}
                            </button>
                            <button className="btn bg-yellow-500 shadow-lg text-white font-bold">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cartshow
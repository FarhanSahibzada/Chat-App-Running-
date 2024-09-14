import React, { useEffect, useState } from 'react'
import { Await, useNavigate } from 'react-router-dom'
import { LuShoppingCart } from 'react-icons/lu';

function Mycart() {
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);


    let fetch = async () => {
        const data = await JSON.parse(localStorage.getItem("addCart"));
        setproducts(data || [])
    }

    useEffect(() => {
        fetch()
    }, [])

    let removeProduct = (indexRemove) => {
        let update = products.filter((_,index) => index != indexRemove);
        setproducts(update)
        localStorage.setItem("addCart" , JSON.stringify(update))
    }

    return (

        <div className='bg-slate-100'>
            {/* navber start */}
            <div className=' w-full flex justify-between flex-wrap gap-2 items-center  bg-red-600  shadow-lg'>
                <h2 className='text-white py-3 px-4 font-bold text-2xl'>My Cart</h2>
                <div className='flex justify-center items-center gap-2'>
                    <h2 className='text-white py-3 px-4 font-bold text-base cursor-pointer' onClick={() => {
                        navigate("/Home")
                    }}>Chats</h2>
                    <h2 className='text-white py-3 px-4 font-bold text-base cursor-pointer' onClick={() => {
                        navigate("/Myshop")
                    }}>MarketPlace</h2>
                    <h2 className='text-white py-3 px-4 font-bold text-base cursor-pointer' onClick={() => {
                        navigate("/Profile")
                    }}>Profile</h2>

                </div>
                <div>
                    <button className='relative text-white text-3xl rounded-lg bg-pink-500 me-4 px-3 py-2'>
                        <LuShoppingCart />
                        {/* Badge */}
                        <span className='absolute top-[-8px] right-0 bg-blue-500 rounded-full py-1 px-2 font-bold text-sm'>
                            {products.length}
                        </span>
                    </button>
                </div>
            </div>
            {/* navber end */}

            {/* Body Start */}
            <div className='p-6'>
                <div className='bg-white rounded-lg p-4'>
                    <h1 className='p-2 text-3xl border-b-2 border-black font-bold'>Products</h1>
                    {products.map((product, index) => (
                        <div key={index} className="card card-side bg-base-100  shadow-xl  p-2 mt-2 relative">
                            <figure className='w-3/12 h-56 '
                            >
                                <img
                                    src={product.api_featured_image}
                                    alt="Image" />
                            </figure>
                            <button
                                className="absolute top-2 right-2 text-red-600 font-bold text-lg cursor-pointer"
                                onClick={() => removeProduct(index)}
                            >
                                &times;
                            </button>
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <p>{product.description
                                    ? product.description.length > 100
                                        ? product.description.slice(0, 100) + "..."
                                        : product.description
                                    : "description is not available"}</p>
                                <p className='text-lg font-semibold text-orange-500 '>${product.price}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}

export default Mycart
import React, { useEffect, useState } from 'react'
import { Await, json, useNavigate } from 'react-router-dom'
import axios from 'axios';
import backimage from '../image/back.png'
import './all.css'
import fetchProducts from './product';


function Myshop() {
  //  fetch data from google sheet
  // const SHEET_ID = 'YOUR_SHEET_ID';
  // const API_KEY = 'ASyCduUlfEdipLTGF-sCizDO488Xm8gExsAA';
  // const RANGE = 'Sheet1'; // Your sheet name and range

  // // Function to fetch data from Google Sheets
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
  //     );
  //     // Handle response data
  //   } catch (error) {
  //     console.error('Error fetching data from Google Sheets', error);
  //   }
  // };


  const navigate = useNavigate();
  const [selectcategorie, setselectcategorie] = useState('');
  const [val, setval] = useState('all')
  const [productss, setproductss] = useState([])
  const [loading, setloading] = useState(false);
  const [cate, setcate] = useState([]);
  const [add , setadd] = useState([]);

  const selecthandle = (e) => {
    const value = e.target.value;
    setselectcategorie(value)
    if (value == "chats") { navigate("/Home") }
    else if (value == "Profile") { navigate("/Profile") }
    else if (value == "Mycart") { navigate("/Mycart") }
  }


  useEffect(() => {
    async function data() {
      setloading(true)
      const data = await fetchProducts(val)
      if (data) {
        setproductss(data)
        const uniqueCategories = [...new Set(data.map((pro) => pro.product_type))];
        if (cate.length == 0) {
          setcate(uniqueCategories)
        }

      } else {
        console.log("error message");
      }

      setloading(false)
    }
    data()
  }, [val])

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

  return (
    <div>
      <div className="navber z-50  w-full flex flex-wrap justify-between gap-4 items-center bg-red-600 shadow-lg px-4 py-3">
        {/* Logo */}
        <h2 className="text-white font-bold text-2xl">MarketPlace</h2>

        {/* Search Form */}
        <div className="flex flex-grow justify-center items-center py-2">
          <form className="flex w-full justify-center items-center  flex-wrap md:flex-nowrap">
            <div className="sel md:w-36  md:mb-0">
              <select
                id="categories"
                className="block w-full px-4 py-2 h-full bg-white border border-gray-300 rounded-full 
                   md:rounded-l-lg md:rounded-r-none border-r-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={val}
                onChange={(e) => setval(e.target.value)}
              >
                <option value="all" disabled >Select Category</option>
                {cate.map((categorie, index) => (
                  <option key={index} value={categorie}>
                    {categorie}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="search"
              placeholder="Search Name"
              className="inp md:w-[40vw] py-1.5 px-4 h-full font-semibold 
                text-xl outline-none border border-gray-300 border-l-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="btn1 py-2.5 px-4 h-full bg-slate-700 text-white font-bold rounded-r-lg border border-gray-300 border-l-0"
            >
              Search
            </button>
          </form>
        </div>


        <div className="w-full md:w-32 z-10 mt-2 md:mt-0">
          <select
            id="account-options"
            value={selectcategorie}
            onChange={selecthandle}
            className="block w-full rounded-lg px-4 font-semibold py-2 h-full bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Farhan</option>
            <option value="chats" className="font-bold text-base cursor-pointer ">Chats</option>
            <option value="Profile" className="font-bold text-base cursor-pointer  hover:bg-red-400">Profile</option>
            <option value="Mycart" className='font-bold text-base cursor-pointer'>My Cart</option>
          </select>
        </div>
      </div>

      <div className='bg-gray-100  '>
        {/* <img src={backimage} alt="" className='bg-slate-300 rounded-full p-3 w-12 ms-3  mt-3 cursor-pointer' onClick={() => {
          navigate("/Home")
        }} /> */}

        {loading ? (
          <div className="fixed h-full w-full flex items-center justify-center bg-white z-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:grid-cols-3 gap-6 p-4">
            {productss.map((product, index) => (
              <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                <img onClick={()=> navigate("/Cartshow", {state : {...product}})} className="w-full h-48 object-cover cursor-pointer" src={product.api_featured_image} alt={product.name} />
                <div className="px-6 py-4">
                  <div className='flex justify-between'>
                    <h2 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h2>
                    <h2 className="text-base font-semibold mb-2 text-gray-600">{product.brand}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description
                    ? product.description.length > 100
                      ? product.description.slice(0, 100) + '...'
                      : product.description
                    : 'No description available'}
                  </p>
                  <p className="text-lg font-semibold text-orange-500">${product.price}</p>
                </div>
                <div className="px-6 py-4">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                    onClick={() => { addtocart(product) }}
                  >
                   {add.includes(product.id) ? '✔' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div >
    </div>
  )
}

export default Myshop
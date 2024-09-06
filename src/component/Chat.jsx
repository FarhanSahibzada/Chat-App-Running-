import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from './firebase/firebase';
import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import dpimage from '../image/dp.png'
import backimage from '../image/back.png'
import sendicon from '../image/sendicon.png'
import moment from 'moment';

function Chat(props) {
    let navigate = useNavigate();
    let { state } = useLocation();
    const [message, setmessage] = useState("");
    let [chatlist, setchatlist] = useState([]);

    useEffect(() => {

       let q =  query(
        collection(db, "chat"),
        where("senduid", "in", [state.myuid, state.useruid]),
        where("receiveruid", "in", [state.myuid, state.useruid]));
        const unsub = onSnapshot(q, (querysnapshot) => {
            let list = []
            querysnapshot.forEach((doc) => {
                list.push(doc.data())

            })
            const sortlist = list.sort((a, b) => a.createAt - b.createAt)
            setchatlist(sortlist);
        })
        return () => unsub;
    }, [])

    let messagehandle = () => {
        addDoc(collection(db, "chat"), {
            message,
            senduid: state.myuid,
            receiveruid: state.useruid,    
            senderuid: state.useruid,
            createAt: Date.now(),
        })
        setmessage("");
    }

    return (
        <div>

            <div className=' w-full  bg-red-600  shadow-lg'>
                <h2 className='text-white py-3 px-4 font-bold text-2xl flex items-center  gap-2'><img src={dpimage} alt="" className='w-12 h-1/5 rounded-full border-2 border-green-600' />{state.name}</h2>
            </div>

            <div className='bg-gray-100  h-[75vh] overflow-x-hidden'>
                <img src={backimage} alt="" className='bg-slate-300 rounded-full p-3 w-12 ms-3  mt-3 cursor-pointer' onClick={() => {
                    navigate("/home")
                }} />
                {
                    chatlist.map((item, index) => (
                        <div key={index} className={`mt-2 flex px-10 ${item.senderuid == state.useruid ? "justify-end" :"justify-start"}`}>
                            <div className='shadow-lg rounded-lg py-2 px-4'>
                            <h1 className='font-semibold text-xl '>{item.message}</h1>
                            <p className='text-gray-500 '>{moment(item.createAt).startOf('seconds').fromNow()}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='flex items-center justify-center bg-gray-100 pb-12'>
                <input className='px-3 py-2  rounded-full w-[50%]'
                    type="text"
                    placeholder='Type a Message'
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                />
                <button onClick={messagehandle} className=' text-white font-semibold pe-8 '><img src={sendicon} alt="" className='w-24' /></button>
            </div>

        </div>
    )
}

export default Chat
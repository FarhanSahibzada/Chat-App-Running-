import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';



function Home() {
  const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const userid = await localStorage.getItem("useruid");    
            if (userid) {
                navigate('/Home');
            } else {
                navigate('/Login');
            }
        };

        setTimeout(() => {
            checkUser();
        }, 1000);
    }, [navigate]);

  return (
    <div>Home</div>
  )
}

export default Home
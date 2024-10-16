import  { useEffect, useState } from 'react';
import Img from '../components/Img';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [d,sd]=useState<U>()
    const [p,so]=useState<string>()
    const f=(e:string)=>{
so(e)
    }
                                                                                           
    const navigate=useNavigate()
const api=async()=>{
    const { data }:AxiosResponse<{data:U}&Post&Pic> = await axios.get('http://localhost:3000/user/data',{withCredentials:true})
   
    
    if (data.success) {
sd(data.data)

so(data.pic)
    
  }else{
    alert(data.message)
navigate('/Login')
  }
    
}
useEffect(()=>{
    api()
},[])


    return (
        <div>
            <Img ul={p!} o={f} />
            <div>
                {
                    d?.name
                }
            </div>
            <div>
                {d?.email}
            </div>
           <div>
                {d?.number}
           </div>
            
        </div>
    );
};

export default Home;
import axios, { AxiosResponse } from 'axios';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sign = () => {

    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)



    const navigate = useNavigate()
    const hand = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
         if (!email.current?.value) return
        else if (!password.current?.value) return
        else {
             const { data }: AxiosResponse<Post> = await axios.post("http://localhost:3000/user/log", {
                re: {  email: email.current.value, password: password.current.value }
            },{
                withCredentials: true
            })
            if (data.success) {
                alert(data.message)
                
                email.current.value = ""
                password.current.value = ""
                navigate('/')
            } else {
                alert(data.message)
            }
        }

    }


    return (
        <div >
            <form onSubmit={(e) => hand(e)} className=' relative translate-x-[-50%] left-[50%] top-[50%] h-max px-4 sm:w-max md:w-7/12'>
                <h1 className='text-[5vw]  font-bold'>Login now</h1>
                
                <input type="email" className='block w-full border-2 border-black rounded-lg p-3 my-3' ref={email} placeholder='Enter the Email ' />
                <input type="password" className='block w-full border-2 border-black rounded-lg p-3 my-3' ref={password} placeholder='Enter the Password ' />
                <div className='flex justify-around'>
                    <Link to={'/Login'} className='border-2 p-4 mx-2 rounded-md active:bg-black border-black w-full'>Sign</Link>
                    <button className='w-full  bg-black active:bg-white text-white p-3 rounded-md'>
                        Login
                    </button>
                </div>

            </form>

        </div>
    );
};

export default Sign;
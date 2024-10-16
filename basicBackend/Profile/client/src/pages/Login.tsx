import axios, { AxiosResponse } from 'axios';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const name = useRef<HTMLInputElement>(null)
    const number = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)



    const navigate = useNavigate()
    const hand = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.current?.value) return
        else if (!email.current?.value) return
        else if (!password.current?.value) return
        else if (!number.current?.value) return
        else {
            const lol: U = { name: name.current.value, email: email.current.value, password: password.current.value, number: number.current.value }
        

            const { data }: AxiosResponse<Post> = await axios.post(`http://localhost:3000/user/sign`
,       {
                re:lol,
            },{
                
                withCredentials: true
                }
      


            )
            if (data.success) {
                alert(data.message)
                name.current.value = ""
                email.current.value = ""
                password.current.value = ""
                number.current.value = ""
                navigate('/')
            } else {
                alert(data.message)
            }
        }

    }


    return (
        <div >
            <form onSubmit={(e) => hand(e)} className=' relative translate-x-[-50%] left-[50%] px-4 sm:w-max md:w-7/12'>

                <h1 className='text-[5vw]  font-bold'>Make Account  Now</h1>
                <input type="text" ref={name} placeholder='Enter the Name ' className='block w-full border-2 border-black rounded-lg p-3 my-3' />
                <input type="number" className='block w-full border-2 border-black rounded-lg p-3 my-3' ref={number} placeholder='Enter the Number ' />
                <input type="email" className='block w-full border-2 border-black rounded-lg p-3 my-3' ref={email} placeholder='Enter the Email ' />
                <input type="password" className='block w-full border-2 border-black rounded-lg p-3 my-3' ref={password} placeholder='Enter the Password ' />
                <div className='flex justify-around'>
                    <Link to={'/Sign'} className='border-2 p-4 mx-2 rounded-md active:bg-black border-black w-full'>Login</Link>

                    <button className='w-full  bg-black active:bg-white text-white p-3 rounded-md'>
                        Sign
                    </button>
                </div>

            </form>

        </div>
    );
};

export default Login;
import axios, { AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react';
import '../index.css'

const Img = ({ ul, o }:  { ul: string; o: (e:string)=>void; }) => {
    const [url, setUrl] = useState<string | null>(null)
    const inp = useRef<HTMLInputElement | null>(null)

    const img = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            try {
                const { data }: AxiosResponse<Post> = await axios.post('http://localhost:3000/user/pic', formData,{
                    withCredentials:true
                });
                if (data.success) {
                    console.log(data.message);
                    
                    setUrl(data.message)
                } else {
                    alert(data.message)
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                // Handle error gracefully
                alert('Error uploading image');
            }
        }
    }
const re =async()=>{
try {
    const { data }: AxiosResponse<Post> = await axios.get('http://localhost:3000/user/remove',  {
        withCredentials: true
    });
    if (data.success) {
        setUrl("")
        o("")
    }
} catch (error) {
    
}

}
    return (
        <div>
            <div className='relative   w-80 h-80'>
                <input type="file" ref={inp} name='file' className=' hidden' onChange={(e) => img(e)} />
                <img src={url ? url : ul} className=' absolute rounded-full h-80 w-80 bg-black' alt="" />
                <div className='absolute pic-h flex items-center right-10 bottom-7 bg-white'>🖊️
                <div className='pic  cursor-pointer'>
                    <div onClick={() => inp.current?.click()}> new add </div>
                    <div onClick={()=>re()}>remove</div>

                </div>
                </div>
            </div>
        </div>
    );
};

export default Img;

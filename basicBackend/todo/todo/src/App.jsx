import axios from "axios"
import { useEffect, useMemo, useRef } from "react"
import { useState } from "react"


function App() {
  const title = useRef('')
  const [count, setCount] = useState([])
  const [win, setwin] = useState(false)
  const [unt, sunt] = useState(null)
  const [ut, ste] = useState(null)
  const [u, st] = useState(null)
  const  [did,idid]=useState(null);
  useEffect(() => {
    axios.get('http://localhost:3000/todo/get')
      .then((response) => {
        setCount(response.data)
      })
  }, [unt])
  const handl = async (e) => {
    e.preventDefault()
   if (title.current.value!=="") {
     await axios.post(`http://localhost:3000/todo/makeData`, { title: title.current.value })
       .then(() => {
         sunt(title.current.value)
         title.current.value = ""
       }).catch(() => {
         console.log("error");
       });
       console.log("lol");
   }

  }
  const dele = async (id) => {
    await axios
      .delete(`http://localhost:3000/todo/delete/${id}`)
      .then(() => {
        sunt(id);
      })
      .catch((e) => console.log(e));
  };
const sub=(e)=>{
  e.preventDefault()
  if (u) {
    console.log(u);
    axios.put(`http://localhost:3000/todo/update/${did}`, { todo: u })
      .then(() => {
        sunt(did + 'p')
        setwin(p => !p)

      })
    
      .catch((e) => console.log(e))
  }
}
console.log(Math.floor(Math.random()*10));
  return (
    <div className="bg-slate-950 position-relative text-white w-full h-min-[100vh]">
    {
        win ? <div style={{position:'absolute'}} className={` flex justify-center items-center  top-0 bg-slate-500 w-full h-full  ${win ? "h-min-[100vh] z-10" : "h-0 z-0"}`}>
          <div className="">
            <form onSubmit={(e)=>sub(e)} className="text-center my-6 border border-zinc-700   mx-auto overflow-hidden pl-3 rounded-[1.5vw]" >
              <input type="text" onChange={(e) => st(e.target.value)} placeholder={`${ut}` } className="bg-transparent placeholder:text-white outline-none"/>
              <button className="bg-slate-500 active:bg-black active:text-white text-black p-3">add</button>
            </form>

          </div>
        </div>:null
    }
      <div className="w-3/4 position-absolute top-0 mx-auto py-4">
        <h1 className="text-center text-[2vw] font-extrabold">Todo</h1>
        <form onSubmit={(e) => handl(e)} className="text-center my-6 border border-zinc-700 w-[22%]  mx-auto overflow-hidden pl-3 rounded-[1.5vw]">
          <input type="text" className="bg-transparent placeholder:text-gray-600 outline-none" placeholder="EN ter or todo" ref={title} />
          <button type="submit" className="bg-slate-500 active:bg-black active:text-white text-black p-3">Add</button>
        </form>
        <div>

          {
            count.map((p, i) => <div key={i} className="w-[22%] my-4 p-4 rounded-lg mx-auto flex justify-between bg-slate-500">
              <div>
                {
                  p.title
                }
              </div>
              <div className="flex justify-center gap-2">
                <div onClick={() => (setwin(p => !p), ste(p.title) ,idid(p._id))} >
                  ✒️
                </div>
                <div className="cursor-pointer" onClick={() => dele(p._id)}>
                  🗑️
                </div>
              </div>
            </div>)
          }

        </div>
      </div>

    </div>
  )
}

export default App

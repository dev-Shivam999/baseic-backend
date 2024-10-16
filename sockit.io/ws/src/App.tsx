import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMesssage] = useState()

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3000');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setMesssage(message.data)
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])
  const [data,setdata]=useState("")

  return (
    <>
     <div>
     
        <input type="text" onChange={(e)=>setdata(e.target.value)} />
        <button onClick={()=>socket?.send(data)}>magic</button>
   
      {message}
     </div>
    </>
  )
}

export default App
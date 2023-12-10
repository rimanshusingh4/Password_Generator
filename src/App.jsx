import { useCallback, useState, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [len,setLen] = useState(8);
  const [numallocate, setNumallocate] = useState(false);
  const [charallocate, setCharallocate] = useState(false);
  const [pass,setPass] = useState("");

  const passGenerator = useCallback(() =>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numallocate) str+= "0123456789";
    if(charallocate) str+="@#$&+-";
    for(let i=1; i<=len; i++){
      let char = Math.floor(Math.random() * str.length+1);
      pass += str.charAt(char);
    }
    setPass(pass);


  }, [len,numallocate,charallocate,setPass])
  
  useEffect(()=>{passGenerator()},
  [len,numallocate,charallocate,passGenerator])

  //UseRef 

  const passRef = useRef(null)

  const copyPassToClip= useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,49);
    window.alert("Copied!")
    window.navigator.clipboard.writeText(pass);
  })
  return (
    <div className='border-double  border-x-8 bg-gray-800	 rounded-3xl border-red-600	p-12'>
      <h1 className='pb-8'>Password Generator.</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-4'>
        <input type='text'
        value={pass}
        className='outline-none w-full py-3 px-3'
        readOnly
        placeholder='Password'
        ref={passRef}
      />
      <button
      onClick={copyPassToClip}
      className='outline-none shrink-0 bg-green-400'>COPY</button>
      </div>
      <div className='flex text-xl gap-x-6'>
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={8}
            max={50}
            value={len}
            onChange={(e)=>{setLen(e.target.value)}}
            className='cursor-pointer'
          />
          <label>Length: {len}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numallocate}
            id='numInput'
            onChange={()=>setNumallocate((prev) => !prev)}
          />
          <label>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={charallocate}
            id='numInput'
            onChange={()=>setCharallocate((prev) => !prev)}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  )
}

export default App

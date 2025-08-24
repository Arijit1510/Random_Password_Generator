import { useState, useCallback, useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
const [length, setLength] = useState(6);
const [numAllowed,setnumAllowed] = useState(false);
const [charAllowed,setcharAllowed] = useState(false);
const [password,setPassword] = useState("");

//useRef hook
const passwordRef = useRef(null)

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])

const passwordGenerator = useCallback(() => {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numAllowed) str += "0123456789"
  if(charAllowed) str += "~!@#$%^&*()_+-*/.,;:'?><[]{}=`"

  for (let i = 1; i <=length; i++) {
    let char = Math.floor(Math.random() * str.length)
    pass += str.charAt(char)
  }

  setPassword(pass)
}, [length,numAllowed,charAllowed,setPassword])

useEffect(() => {
  passwordGenerator()
},[length,numAllowed,charAllowed,passwordGenerator])
return (
  <>
  <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-9 px-3 text-white bg-black">
    <h1 className='text-white text-center my-4'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden my-4">
      <input type="text" value={password} className='outline-none border-black w-full py-4 px-3 text-black bg-gray-500' placeholder='password' ref={passwordRef} readOnly/>
   <button onClick={copyPasswordToClipboard} className='px-3 bg-blue-500 ${isCopied ? bg-blue-500}'>copy</button>
   </div>
   <div className='flex text-sm gap-x-2'>
    <div className="flex items-center gap-x-1 px-4">
      <input type="range" min={6} max={20} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
    <label>Length: {length}</label>
    </div>
    <div className='flex items-center gap-x-1 px-2'>
      <input type="checkbox" defaultChecked={numAllowed} id='numberInput' onChange={() => {setnumAllowed((prev) => !prev)}}/>
      <label>Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox" defaultChecked={charAllowed} id='charecterInput' onChange={() => {setcharAllowed((prev) => !prev)}} />
      <label htmlFor='characterInput'>Charecter</label>
    </div>
   </div>
  </div>
  </>
  )
}
export default App
import {useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {login} from "../utils/authSlice"
const LoginPage = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch();

  async function handleSubmit(e){
    e.preventDefault()
    console.log(email)
    console.log(password)
    try{
    const data = await axios.post("http://127.0.0.1:8000/api/login",{email,password})
    const finalData = data.data
    dispatch(login(finalData.accessToken))
    } catch(err){
      console.log(err)
    }
  }
  return (
    <div><h2>Login</h2>
    <div>
      <form>
        <div >
        <label>Email</label>
        <input type='email' name='email' onChange={(e)=>{setEmail(e.target.value)}}/>      
        </div>
        <div>
        <label>Password</label>
        <input type='password' name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div><button onClick={handleSubmit}>Login</button></div>
      </form>
    </div>
    </div>
  )
}

export default LoginPage
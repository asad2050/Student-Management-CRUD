import {useState} from 'react'

const LoginPage = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    console.log(email)
    console.log(password)
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
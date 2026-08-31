import React from 'react'
import { useSelector } from 'react-redux'
const ProtectedRoute = () => {
  const token = useSelector((store)=>store.auth.token)
  console.log(token)
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute
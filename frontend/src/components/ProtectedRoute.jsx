import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
   const token = useSelector((store)=>store.auth.token) || localStorage.getItem("token")
  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('isAuthenticated');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;

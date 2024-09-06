import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../services/authService";
import { Button, TextField, Typography, Box, Container, Alert } from "@mui/material";
import './Login.scss';
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    authenticate(email, password)
      .then(() => {
        localStorage.setItem('isAuthenticated', true);
        navigate('/dashboard');
      })
      .catch(err => setError('Invalid email or password'));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  return (
    <Container className="login-container" maxWidth="xs">
      <Box className="login-box">
        <Typography variant="h4" component="h1" className="login-title">
          Login
        </Typography>
        {error && <Alert severity="error" className="login-error">{error}</Alert>}
        <Box component="form" onSubmit={handleLogin} className="login-form">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            name="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            name="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
            disabled={!password || !email}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

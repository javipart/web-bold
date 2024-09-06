import { AppBar, Button, Container, IconButton, Toolbar, Tooltip } from '@mui/material';
import { ExitToApp, HelpOutline, Person } from '@mui/icons-material';
import './NavBar.scss';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const isAuthenticated = useAuth();
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  const navigate = useNavigate();

  const handleAction = () => {
    if (isAuthenticated) {
      localStorage.clear();
      setIsAuth(false);
      navigate('/login')
    } else {
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    if(isAuthenticated) {
      setIsAuth(true);
    }
  }, [isAuthenticated])

  return (
    <AppBar position='static' className='app-header'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <section className='panel-header'>
            <img src='/logo.svg' alt='Bold' className='App-logo' />
          </section>
          <section style={{ textAlign: 'end', width: '100%' }}>
            <Button sx={{ color: '#FFFFFF' }}>
              Mi negocio
            </Button>
            <Button
              sx={{ color: '#FFFFFF' }}
              endIcon={
                <Tooltip title='¿Necesitas Ayuda?'>
                  <HelpOutline />
                </Tooltip>}>
              Ayuda
            </Button>
            <IconButton sx={{ color: '#FFFFFF' }} onClick={handleAction}>{isAuth ? <ExitToApp /> : <Person />}</IconButton>
          </section>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar;
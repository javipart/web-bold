import React from 'react';
import { AppBar, Button, Container, Toolbar, Tooltip } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import './NavBar.scss';

const NavBar = () => {
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
          </section>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar;
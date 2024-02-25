import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0BB3D9',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: 'white !important',
          },
        },
      },
    },
  },
});

const Navbar = ({ handleLogout }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const pages = ['/dashboard', '/'];
  const settings = ['Dashboard', 'Logout'];

  const handleMenuItemClick = (page) => {
    handleCloseUserMenu();
    if (page === '/') {
      window.location.href = 'http://localhost:3001/';
    } else if (page === '/logout') {
      handleLogout(); // Call the handleLogout function provided as a prop
    } else {
      navigate(page);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar sx={{ position: 'static', height: '6rem', backgroundColor: '#7AD9E0' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: '6rem' }}>
            <Link to="/" rel="home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src="https://craftindika.com/_next/image?url=%2FCraftIndika.png&w=384&q=75"
                alt="Craftindica"
                className="logo dark-logo"
                width="280"
                height="80"
                style={{ marginLeft: '20px' }}
              />
            </Link>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, position: 'absolute', right: '0', top: '2rem', color: 'inherit' }}
              >
                <PersonIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={setting} onClick={() => handleMenuItemClick(pages[index])}>
                    {setting === 'Logout' ? (
                      <Typography textAlign="center" sx={{ color: 'black' }}>
                        {setting}
                      </Typography>
                    ) : (
                      <Link to={pages[index]} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography textAlign="center" sx={{ color: 'black' }}>
                          {setting}
                        </Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;

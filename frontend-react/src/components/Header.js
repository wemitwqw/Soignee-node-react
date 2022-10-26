import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AuthService from "../Auth/AuthService";

export default function MenuAppBar({loginok, setLoginok}) {  
  let navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  function formSubmitHandler(e){
    e.preventDefault();
    navigate("/search/" + searchQuery, { replace: true });
  }

  async function HandleLogout() {
    AuthService.logout()
    setLoginok(false);
    navigate("/", { replace: true });
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
  }));

  const [hideSearch, setHideSearch] = useState(true);
  useEffect(() => {
    if((window.location.pathname === '/') || (window.location.pathname === '/search')){
      setHideSearch(true)
    }else{
      setHideSearch(false)
    }
  })

  return (
    <Box sx={{ }}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img id="logo" src="/Soignee.svg" alt="logo"  width= "100px" />
            </Link>
          </Typography>

          {/* {!hideSearch && (
          <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={formSubmitHandler}
          >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />  
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </Search>
          </Box>
          )} */}
          {hideSearch && (
          <Search sx={{display: 'none'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          )}
          {loginok && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to='/profile'>Profile</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/add-listing'>Add Listing</MenuItem>
                {/* <MenuItem onClick={handleClose} component={Link} to='/subscriptions'>Subscriptions</MenuItem> */}
                <MenuItem onClick={() => { handleClose(); HandleLogout();}}>Log Out</MenuItem>
                
              </Menu>
            </div>
          )}
          {!loginok && (
              <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to='/login'>Log in</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/signup'>Sign up</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

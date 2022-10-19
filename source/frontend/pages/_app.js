import React, {useState, useEffect} from 'react';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import UserContext from '../utils/UserContext';
import Router from 'next/router';
import ls from 'local-storage';
import {cookie} from '../utils/global';
import {TOKEN} from '../utils/constant';
import '../styles/global.scss'
let theme = createTheme({
  palette: {
    primary: {
      main: '#6EA654',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          backgroundColor: "white",
          textTransform: "none",
          padding: "5px 25px",
        },
        contained: {
          color: "white",
          textTransform: "none",
          padding: "5px 25px",
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        backgroundColor:'#f3f3f3',
        textColorPrimary : {
          padding: '12px 25px',
          textTransform: 'none',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        marginTop:10
      }
    }
  }
});
const MyApp = ({ Component, pageProps }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const getToken = () => {
    setToken(cookie.get(TOKEN) || ls.get('token'))
  }

  const getUser = () => {
    setUser(ls.get('user'))
  }

  const logout = () => {
    setUser(null)
    setToken(cookie.remove(TOKEN,{ path: '/' }))
    ls.remove('token')
    ls.remove('user')
    Router.push('/login');
  }

  useEffect(()=>{
    getToken();
    getUser();
  },[])
  
  return(
    <UserContext.Provider 
      value={{ 
        token:token, 
        logout: logout,
        user: user,
        setUser: setUser,
      }}
    >
      <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
    </UserContext.Provider>
  )
}

export default MyApp
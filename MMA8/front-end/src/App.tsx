import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useEffect, useState } from 'react';
import './App.css'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header/Header';
import Popup from './components/Popup/Popup';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './store/store';
import { fetchCurrentUser } from './store/accountSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
  useEffect(() => {
    const entrySong = new Audio("\app\songs\warrior.mp3");
    entrySong.play();

    dispatch(fetchCurrentUser());

    return () => {
      entrySong.pause();
      entrySong.currentTime = 0;
    };


  }, [darkMode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Popup darkMode={darkMode} />


        <Container>
          <Outlet />
        </Container>

      </ThemeProvider>

    </>
  )
}

export default App

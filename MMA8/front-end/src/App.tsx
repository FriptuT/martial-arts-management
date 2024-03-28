import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useEffect, useState } from 'react';
import './App.css'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header/Header';
import Popup from './components/Popup/Popup';
import Members from './components/MemberList/MemberList';
import { Outlet } from 'react-router-dom';

function App() {
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


    return () => {
      entrySong.pause();
      entrySong.currentTime = 0;
    };


  }, [darkMode]);

  return (
    <>
      <ThemeProvider theme={theme}>
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

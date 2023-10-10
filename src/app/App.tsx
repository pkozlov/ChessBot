import { useEffect } from 'react';
import { WebAppProvider, useWebApp, useInitData } from '@vkruglikov/react-telegram-web-app';

import { AppProvider } from './context';
import GameController from './components/GameController';
import useStyles from './hooks/useStyles';

import './App.css';

function App() {
  const WebApp = useWebApp();
  const style = useStyles();
  const [initDataUnsafe, ] = useInitData();

  useEffect(() => {
    if (!initDataUnsafe.user?.allows_write_to_pm) {
      WebApp.requestWriteAccess();
    }
  }, [initDataUnsafe.user?.allows_write_to_pm, WebApp])
  
  useEffect(() => {
    WebApp.headerColor = style.bg_color;
    WebApp.backgroundColor = style.bg_color;
    document.body.style.backgroundColor = style.bg_color;
  }, [WebApp, style]);
  
  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <AppProvider>
        <GameController />
      </AppProvider>
    </WebAppProvider>
  );
}

export default App;

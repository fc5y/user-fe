import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Context
import { UserInfoProvider } from 'src/shared/context/UserInfo';
import { ContestInfoProvider } from 'src/shared/context/ContestInfo';

// Utils
import { renderRoute } from './routes';

// Components
import Header from './components/NavBar';

import 'normalize.css';
import './style.scss';

export default function App() {
  return (
    <BrowserRouter>
      <UserInfoProvider>
        <ContestInfoProvider>
          <Header />
          {renderRoute()}
        </ContestInfoProvider>
      </UserInfoProvider>
    </BrowserRouter>
  );
}

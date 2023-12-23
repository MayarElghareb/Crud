// app.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Index from './pages/Index/Index';
import EditMember from './pages/EditMember';
import { MemberProvider } from './context/MemberContext';
import ShowMember from './pages/ShowMember';
import Create from './pages/Create';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 
import LanguageSwitcher from './pages/LanguageSwitcher';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <I18nextProvider i18n={i18n}>
      <LanguageSwitcher />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {loggedIn ? (
            <>
              <Route path="/index" element={<Index />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<EditMember />} />
              <Route path="/show/:id" element={<ShowMember />} />
            </>
          ) : (
            // Redirect to the login page if not logged in
            <Route path="/*" element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>
      </I18nextProvider>
    </Router>
  );
};

export default App;

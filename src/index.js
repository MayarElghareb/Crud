import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MemberProvider } from './context/MemberContext';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18n}>

        <MemberProvider>   <App /></MemberProvider>
        </I18nextProvider>,


  </React.StrictMode>
);


reportWebVitals();

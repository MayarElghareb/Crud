import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='p-5 text-end text-red-600'>
      <button className="p-2 ml-4"onClick={() => changeLanguage('en')}>En</button>
      <button onClick={() => changeLanguage('ar')}>Ar</button>
    </div>
  );
};

export default LanguageSwitcher;

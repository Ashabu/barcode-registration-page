import React from 'react';
import './App.scss';
import RegistrationPage from './components/registrationPage/RegistrationPage';
import Otp from './components/Otp/Otp';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        {/* <RegistrationPage /> */}
        <Otp count = {4}/>
      </Layout>

    </div>
  );
}

export default App;

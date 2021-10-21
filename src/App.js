import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';
import RegistrationPage from './components/registrationPage/RegistrationPage';
import Otp from './components/Otp/Otp';
import Layout from './components/Layout/Layout';

function App() {
  const [step, setStep] = useState(0);

  const handleUserOtp = (value) => {
      setStep(1);
      axios.post(`https://citymallapi.payunicard.ge:8061/api/Otp/SendUserOtp`, {phone: value})
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e)
      });
  }

  return (
    <div className="App">
      <Layout>
        <RegistrationPage callBack = {handleUserOtp}/>
        {/* <Otp count = {4}/> */}
      </Layout>

    </div>
  );
}

export default App;

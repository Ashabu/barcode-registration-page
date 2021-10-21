import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Otp from '../components/Otp/Otp';
import Layout from '../components/Layout/Layout';
import RegistrationPage from '../components/registrationPage/RegistrationPage';



const RegisterPage = () => {

  const [step, setStep] = useState(0);
  const [regData, setRegData] = useState(null);
  const [displayText, setDisplayText] = useState('');
  const [otpErrorText, setOtpErrorText] = useState('');

  useEffect(() => {
    if (regData !== null) {
      setStep(1);
    }
  }, [regData])

  const handleRegData = (data) => {
    console.log(data)
    setRegData({ ...data });
  }

  const handleCostumerRegistration = (otp) => {
    let data = { ...regData, otp };
    axios.post(`https://citymallapi.payunicard.ge:8061/api/Clients/AddVirtCard`, data)
      .then(res => {
        if (res.status === 200) {
          setDisplayText('თქვენ წარმატებით გაიარეთ რეგისტრაცია, ვირტუალური ბარათის ბმულს მიიღებთ SMS – ის სახით');
          setStep(2);
          return;
        }
      })
      .catch(e => {
        if (e.response.data.ErrorCode == 111) {
          setOtpErrorText(e.response.data.ErrorMessage)
          return;
        } else {

          setDisplayText(e.response.data.ErrorMessage);
          setStep(2);
          return;
        };
      });
  }



  return (
    <div className="App">
      <Layout>
        {
            step === 0 ?
              <RegistrationPage callBack={handleRegData} />
              :
            step === 1 ?
              <Otp phoneNumber={regData?.phone} count={4} callBack={handleCostumerRegistration} error={otpErrorText} />
              :
              <div style={{ width: '100%', color: '#FFFFF', textAlign: 'center' }}>
                <p>
                  {displayText}
                </p>

              </div>
        }
      </Layout>

    </div>
  );
}


export default RegisterPage;
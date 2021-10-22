import React, {useEffect, useRef, useState} from 'react';
import Layout from '../components/Layout/Layout';
import {useLocation} from "react-router-dom";
import Barcode from "react-hooks-barcode";
import axios from 'axios';


const VirtualCardPage = () => {
  const [barcodeValue, setBarcodeValue] = useState('');
  const [userPoints, setUserPoints] = useState('')

  const location = useLocation();

      useEffect(()=> {
        let value = location.pathname.split("/");
        setBarcodeValue(value[2]);

      }, []);

      useEffect(() => {
        getUserPoints();
      }, [barcodeValue])

      const getUserPoints = () => {
        axios.get(`https://citymallapi.payunicard.ge:8061/api/Clients/GetAmount?Card=${barcodeValue}`)
        .then(res => {
          setUserPoints(res.data.data.amount)
        })
        .catch(e => {
          console.log(e)
        })
      }

      const config = {
        background: "#FFFFFF",
        marginTop: "20px",
        marginBottom: "20px",
        width: 3
      };
      
      // console.log(document.getElementById("2")?.firstElementChild[0]);

    return (
        <Layout>
          <div className = 'balance'>
                <span>
                  ბალანსი: &nbsp;
                </span>
                <span>
                {userPoints}
                </span>
              </div>
          <div id="2" className = "virt-card">
            
            <div className = 'barcode'> 
            
            <Barcode value={barcodeValue} {...config}/>
            </div>
            
            </div>
        </Layout>
    );
};

export default VirtualCardPage;
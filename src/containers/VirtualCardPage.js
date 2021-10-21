import React, {useEffect, useRef, useState} from 'react';
import Layout from '../components/Layout/Layout';
import {useLocation} from "react-router-dom";
import Barcode from "react-hooks-barcode";


const VirtualCardPage = () => {
  const [barcodeValue, setBarcodeValue] = useState('');

  const location = useLocation();

      useEffect(()=> {
        let value = location.pathname.split("/");
        setBarcodeValue(value[2]);

      }, [])

      const config = {
        background: "#f5f5f5",
        marginTop: "20px",
        marginBottom: "20px",
        width: 3
      };
      

    return (
        <Layout>
          <div className = "virt-card">
            <Barcode value={barcodeValue} {...config}/>
            </div>
        </Layout>
    );
};

export default VirtualCardPage;
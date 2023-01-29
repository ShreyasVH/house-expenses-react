import {Component, useEffect, useState} from "react";
import {getBillById, getBillsByFilter} from "../../../apiHelpers/bill";
import {getUrlParam} from "../../../utils";
import DetailsCore from './core';
import { useNavigate } from "react-router-dom";

export default function Details() {
  const [loaded, setLoaded] = useState(false);
  const [bill, setBill] = useState({});
  const navigate = useNavigate();

  const billId = getUrlParam('id');

  useEffect(() => {
    Promise.all([
        getBillById(billId)
      ])
      .then((responses) => {
        const billResponse = responses[0];
        setBill(billResponse.data.data);
        setLoaded(true);
      })
  }, []);

  const addReceipt = () => {
    navigate('/expenses/create?billId=' + billId);
  }

  const addBill = () => {
    navigate('/bills/create');
  }

  const renderMarkup = () => {
    if (loaded) {
      return (
        <DetailsCore
          {...bill}
          onAddReciptClick={addReceipt}
          onAddBillClick={addBill}
        />
      );
    }
  }

  return (
    <>
      {renderMarkup()}
    </>
  );
}
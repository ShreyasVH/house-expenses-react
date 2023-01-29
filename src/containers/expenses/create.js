import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material/index';
import {Component, useState} from 'react';

import { saveExpense } from '../../apiHelpers/expense';
import { isSuccessfulResponse, uploadFile } from '../../utils/api';
import { copyObject, getUrlParam } from '../../utils';
import {useNavigate} from "react-router-dom";

export default function Create() {
  const defaultState = {
    amount: '',
    receipt: '',
    receiptFile: '',
    receiptDate: '',
    payer: '',
    mode: ''
  };

  const [expense, setExpense] = useState(defaultState);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const receiptResponse = await uploadFile(expense.receiptFile, 'receipts', '');

    const payload = copyObject(expense);
    payload.billId = getUrlParam('billId');
    payload.receipt = receiptResponse.data.url;

    const response = await saveExpense(payload);
    if (isSuccessfulResponse(response)) {
      navigate('/bills/detail?id=' + payload.billId);
    } else {
      alert('Error while saving expense. ' + response.data);
    }
  };

  const handleAmountChange = event => {
    setExpense(Object.assign({}, expense, { amount: event.target.value }));
  };

  const handleReceiptFileChange = event => {
    setExpense(Object.assign({}, expense, { receiptFile: event.target.files[0] }));
  };

  const handleReceiptDateChange = event => {
    setExpense(Object.assign({}, expense, { receiptDate: event.target.value }));
  };

  const handlePayerChange = event => {
    setExpense(Object.assign({}, expense, { payer: event.target.value }));
  };

  const handleModeChange = event => {
    setExpense(Object.assign({}, expense, { mode: event.target.value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            name={'amount'}
            label={'Amount'}
            variant={'outlined'}
            fullWidth
            type={'number'}
            value={expense.amount}
            onChange={handleAmountChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            name={'receipt'}
            label={'Receipt'}
            variant={'outlined'}
            fullWidth
            type={'file'}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleReceiptFileChange}
          />

          <TextField
            name={'receipt-date'}
            label={'Receipt Date'}
            variant={'outlined'}
            fullWidth
            type={'date'}
            value={expense.receiptDate}
            onChange={handleReceiptDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl fullWidth>
            <InputLabel
              shrink
            >
              Payer
            </InputLabel>
            <Select
              name={'payer'}
              variant={'outlined'}
              fullWidth
              onChange={handlePayerChange}
              value={expense.payer}
            >
              <MenuItem value={'Shreyas'}>
                Shreyas
              </MenuItem>
              <MenuItem value={'VSH'}>
                VSH
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel shrink>Mode</InputLabel>
            <Select
              name={'mode'}
              variant={'outlined'}
              fullWidth
              value={expense.mode}
              onChange={handleModeChange}
            >
              <MenuItem value={'Cash'}>
                Cash
              </MenuItem>
              <MenuItem value={'SBI GPAY'}>
                SBI GPAY
              </MenuItem>
              <MenuItem value={'ICICI GPAY'}>
                ICICI GPAY
              </MenuItem>
              <MenuItem value={'SBI NEFT'}>
                SBI NEFT
              </MenuItem>
              <MenuItem value={'ICICI NEFT'}>
                ICICI NEFT
              </MenuItem>
            </Select>
          </FormControl>

          <Button color={'primary'} variant={'contained'} type={'submit'}>Submit</Button>
        </Box>
      </form>
    </>
  );
}
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { getCategories, getSubCategories, getCompanies, saveBill } from '../../apiHelpers/bill';
import { isSuccessfulResponse, uploadFile } from '../../utils/api';
import { copyObject } from '../../utils';
import {useNavigate} from "react-router-dom";

export default function Create () {
  const getDefaultState = {
    name: '',
    amount: '',
    billDoc: '',
    billFile: '',
    billDate: '',
    categoryId: '',
    subCategoryId: '',
    companyId: ''
  };

  const [loaded, setLoaded] = useState(false);
  const [bill, setBill] = useState(getDefaultState);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    Promise.all([
        getCategories(),
        getSubCategories(),
        getCompanies()
      ])
      .then((responses) => {
        const categoryResponse = responses[0];
        setCategories(categoryResponse.data);

        const subCategoryResponse = responses[1];
        setSubCategories(subCategoryResponse.data);

        const companyResponse = responses[2];
        setCompanies(companyResponse.data);

        setLoaded(true);
      })
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const billResponse = await uploadFile(bill.billFile, 'bills', '');

    const payload = copyObject(bill);
    payload.billDoc = billResponse.data.url;

    const response = await saveBill(payload);
    if (isSuccessfulResponse(response)) {
      navigate('/bills/detail?id=' + response.data.data.id);
    } else {
      alert('Error while saving expense. ' + response.data);
    }
  };

  const handleNameChange = event => {
    setBill(Object.assign({}, bill, { name: event.target.value }));
  };

  const handleAmountChange = event => {
    setBill(Object.assign({}, bill, { amount: event.target.value }));
  };

  const handleBillFileChange = event => {
    setBill(Object.assign({}, bill, { billFile: event.target.files[0] }));
  };

  const handleBillDateChange = event => {
    setBill(Object.assign({}, bill, { billDate: event.target.value }));
  };

  const handleCategoryChange = event => {
    setBill(Object.assign({}, bill, { categoryId: event.target.value }));
  };

  const handleSubCategoryChange = event => {
    setBill(Object.assign({}, bill, { subCategoryId: event.target.value }));
  };

  const handleCompanyChange = event => {
    setBill(Object.assign({}, bill, { companyId: event.target.value }));
  };

  return (
      <>
        {
          loaded && <>
            <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              name={'name'}
              label={'Name'}
              variant={'outlined'}
              value={bill.name}
              onChange={handleNameChange}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
            />

            <TextField
              name={'amount'}
              label={'Amount'}
              variant={'outlined'}
              fullWidth
              type={'number'}
              value={bill.amount}
              onChange={handleAmountChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              name={'bill'}
              label={'Bill'}
              variant={'outlined'}
              fullWidth
              type={'file'}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleBillFileChange}
            />

            <TextField
              name={'bill-date'}
              label={'Bill Date'}
              variant={'outlined'}
              fullWidth
              type={'date'}
              value={bill.billDate}
              onChange={handleBillDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl fullWidth>
              <InputLabel shrink>Category</InputLabel>
              <Select
                name={'category'}
                variant={'outlined'}
                fullWidth
                value={bill.categoryId}
                onChange={handleCategoryChange}
              >
                {categories.map(category => (
                  <MenuItem value={category.id} key={'category_' + category.id}>
                    {category.name}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel shrink>Sub Category</InputLabel>
              <Select
                name={'subCategory'}
                variant={'outlined'}
                fullWidth
                value={bill.subCategoryId}
                onChange={handleSubCategoryChange}
              >
                {subCategories.map(subCategory => (
                  <MenuItem value={subCategory.id} key={'subCategory_' + subCategory.id}>
                    {subCategory.name}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel shrink>Company</InputLabel>
              <Select
                name={'company'}
                variant={'outlined'}
                fullWidth
                value={bill.companyId}
                onChange={handleCompanyChange}
              >
                {companies.map(company => (
                  <MenuItem value={company.id} key={'company_' + company.id}>
                    {company.name}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>

            <Button color={'primary'} variant={'contained'} type={'submit'}>Submit</Button>
          </Box>
        </form>
          </>
        }
      </>
  );
}
import { useEffect, useState } from 'react';
import {getBillsByFilter, getCategories, getCompanies, getSubCategories} from '../../../apiHelpers/bill';
import BrowseCore from './core';
import { useNavigate } from "react-router-dom";

export default function Browse() {
  const [loaded, setLoaded] = useState(false);
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();
  const [categoryMap, setCategoryMap] = useState({});
  const [subCategoryMap, setSubCategoryMap] = useState({});
  const [companyMap, setCompanyMap] = useState({});

  useEffect(() => {
    Promise.all([
        getBillsByFilter({}),
        getCategories(),
        getSubCategories(),
        getCompanies()
      ])
      .then((responses) => {
        console.log(responses);
        const billResponse = responses[0];
        setBills(billResponse.data.data.list);

        const categoryResponse = responses[1];
        setCategoryMap(categoryResponse.data.reduce((object, category) => {
          object[category.id] = category;
          return object;
        }, {}));

        const subCategoryResponse = responses[2];
        setSubCategoryMap(subCategoryResponse.data.reduce((object, subCategory) => {
          object[subCategory.id] = subCategory;
          return object;
        }, {}));

        const companyResponse = responses[3];
        setCompanyMap(companyResponse.data.reduce((object, company) => {
          object[company.id] = company;
          return object;
        }, {}));

        setLoaded(true);
      })
  }, []);

  const goToDetail = id => {
    navigate('/bills/detail?id=' + id);
  };

  const previewBill = url => {
    window.open(url, '_blank');
  }

  const renderMarkup = () => {
    if (loaded) {
      return (
        <BrowseCore
          bills={bills}
          categoryMap={categoryMap}
          subCategoryMap={subCategoryMap}
          companyMap={companyMap}
          onBillClick={goToDetail}
          onBillPreviewClick={previewBill}
        />
      );
    }
  };

  return (
    <>
      {renderMarkup()}
    </>
  );
}
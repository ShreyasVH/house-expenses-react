import { useEffect, useState } from 'react';
import { getExpensesByFilter } from '../../../apiHelpers/expense';
import { getCompanies, getCategories, getSubCategories } from '../../../apiHelpers/bill';
import BrowseCore from './core';
import { useNavigate } from "react-router-dom";

export default function Browse() {
  const [loaded, setLoaded] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const [categoryMap, setCategoryMap] = useState({});
  const [subCategoryMap, setSubCategoryMap] = useState({});
  const [companyMap, setCompanyMap] = useState({});

  useEffect(() => {
    Promise.all([
        getExpensesByFilter({}),
        getCategories(),
        getSubCategories(),
        getCompanies()
      ])
      .then((responses) => {
        const expenseResponse = responses[0];
        setExpenses(expenseResponse.data.data.list);

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

  const preview = url => {
    window.open(url, '_blank');
  };

  const goToDetail = id => {
    navigate('/bills/detail?id=' + id);
  };

  const renderMarkup = () => {
    if (loaded) {
      return (
        <BrowseCore
          expenses={expenses}
          categoryMap={categoryMap}
          subCategoryMap={subCategoryMap}
          companyMap={companyMap}
          onPreviewClick={preview}
          onBillClick={goToDetail}
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
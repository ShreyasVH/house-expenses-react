import { Component } from 'react';
import {Grid, Paper, styled, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";

const styles = {
  bill: {
    padding: 1,
    textAlign: 'center',
    margin: 1,
    minHeight: 100
  },
  billLink: {
    textDecoration: 'none'
  }
};

class BrowseCore extends Component {
  handleBillClick = id => event => this.props.onBillClick && this.props.onBillClick(id);

  handleBillPreview = url => event => this.props.onBillPreviewClick && this.props.onBillPreviewClick(url);

  getNo = index => (this.props.bills.length - index);

  getCategory = categoryId => this.props.categoryMap[categoryId];

  getSubCategory = subCategoryId => this.props.subCategoryMap[subCategoryId];

  getCompany = companyId => this.props.companyMap[companyId];

  renderMarkup = () => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Sl No
            </TableCell>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Date
            </TableCell>
            <TableCell>
              Preview
            </TableCell>

            <TableCell>
              Amount
            </TableCell>

            <TableCell>
              Category
            </TableCell>

            <TableCell>
              SubCategory
            </TableCell>

            <TableCell>
              Company
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={0}
          >
            <TableCell />
            <TableCell>
              Total
            </TableCell>

            <TableCell />

            <TableCell />

            <TableCell>
              {this.props.bills.reduce((total, bill) => (total + bill.amount), 0)}
            </TableCell>

            <TableCell />

            <TableCell />

            <TableCell />
          </TableRow>

          {
            this.props.bills.map((bill, index) => (
              <TableRow
                key={bill.id}
              >
                <TableCell>
                  {this.getNo(index)}
                </TableCell>
                <TableCell onClick={this.handleBillClick(bill.id)}>
                  {bill.name}
                </TableCell>

                <TableCell onClick={this.handleBillPreview(bill.billDoc)}>
                  Preview
                </TableCell>

                <TableCell>
                  {bill.billDate}
                </TableCell>

                <TableCell>
                  {bill.amount}
                </TableCell>

                <TableCell>
                  {this.getCategory(bill.categoryId).name}
                </TableCell>

                <TableCell>
                  {this.getSubCategory(bill.subCategoryId).name}
                </TableCell>

                <TableCell>
                  {this.getCompany(bill.companyId).name}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    );
  }

  render () {
    return (
      <>
        {this.renderMarkup()}
      </>
    );
  }
}

export default styled(BrowseCore)(styles);
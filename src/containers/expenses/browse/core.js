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
  handlePreview = url => event => this.props.onPreviewClick && this.props.onPreviewClick(url);

  handleBillClick = id => event => this.props.onBillClick && this.props.onBillClick(id);

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
              Bill Name
            </TableCell>
            <TableCell>
              Bill Date
            </TableCell>
            <TableCell>
              Amount
            </TableCell>
            <TableCell>
              Receipt Date
            </TableCell>
            <TableCell>
              Preview
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

            <TableCell>
              Payer
            </TableCell>
            <TableCell>
              Mode
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={0}
          >
            <TableCell>
              Total
            </TableCell>
            <TableCell>
              {this.props.expenses.reduce((total, expense) => (total + expense.amount), 0)}
            </TableCell>

            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
          {
            this.props.expenses.map((expense, index) => (
              <TableRow
                key={expense.id}
              >
                <TableCell>
                  {this.props.expenses.length - index}
                </TableCell>
                <TableCell onClick={this.handleBillClick(expense.billId)}>
                  {expense.bill.name}
                </TableCell>
                <TableCell>
                  {expense.bill.billDate}
                </TableCell>
                <TableCell>
                  {expense.amount}
                </TableCell>

                <TableCell>
                  {expense.receiptDate}
                </TableCell>

                <TableCell onClick={this.handlePreview(expense.receipt)}>
                  Preview
                </TableCell>

                <TableCell>
                  {this.getCategory(expense.bill.categoryId).name}
                </TableCell>

                <TableCell>
                  {this.getSubCategory(expense.bill.subCategoryId).name}
                </TableCell>

                <TableCell>
                  {this.getCompany(expense.bill.companyId).name}
                </TableCell>

                <TableCell>
                  {expense.payer}
                </TableCell>
                <TableCell>
                  {expense.mode}
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
import {Component} from "react";
import {Grid, Paper} from "@mui/material";
import {Button} from "@mui/material/index";

const styles = {
  expense: {
    padding: 1,
    textAlign: 'center',
    margin: 1,
    minHeight: 100
  }
};

export default class DetailCore extends Component {
  handleAddReceiptClick = event => this.props.onAddReciptClick && this.props.onAddReciptClick();

  handleAddBillClick = event => this.props.onAddBillClick && this.props.onAddBillClick();

  renderExpenses = () => {
    return this.props.expenses.map(expense => (
      <Grid item key={expense.id}>
        <Paper sx={styles.expense}>
          <p>
            {expense.amount}
          </p>
          <p>
            {expense.receiptDate}
          </p>
        </Paper>
      </Grid>
    ));
  }

  renderMarkup = () => {
    return (
      <div>
        <p>
          Name: {this.props.name}
        </p>
        <p>
          Amount: {this.props.amount}
        </p>
        <p>
          Date: {this.props.billDate}
        </p>

        <p>
          Pending: {this.props.amount - this.props.expenses.reduce((total, current) => total + current.amount, 0)}
        </p>

        <Button variant={'contained'} onClick={this.handleAddReceiptClick}>
          Add Receipt
        </Button>

        <Button style={{marginLeft: '2%'}} variant={'contained'} onClick={this.handleAddBillClick} color={'success'}>
          Add Another Bill
        </Button>

        <Grid container>
          {this.renderExpenses()}
        </Grid>
      </div>
    );
  };

  render () {
    return (
      <>
        {this.renderMarkup()}
      </>
    );
  }
}
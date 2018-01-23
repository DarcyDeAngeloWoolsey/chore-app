import React, { Component } from 'react';
import './ChoreUpdate.css';


class ChoreUpdate extends Component {

handleSubmit(event) {
  event.preventDefault();
  let choreDate = this.choreDate;
  let choreType = this.choreType;
  let choreBanking = "Deposit";
  let choreAmount = this.choreAmount;
  this.props.addChore(choreDate.value, choreType.value.trim(), choreBanking, choreAmount.value.trim());
  console.log(choreDate.value, choreType.value.trim(), choreBanking, choreAmount.value);
}

  render() {
    return (
      <div className="box row section-border clear">
        <header className="chore-header">
          <div className="chores-title-div col-12-xs">
            <h3 className="chores-title">Update</h3>
          </div>
        </header>
        <div className="chore-update-div">
          <h4 className="chores-section-title left">Add A Chore</h4>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="col-3 col-12-xs inline-block">
              <label htmlFor="date">Date</label>
              <br/>
              <input type="date" name="date" placeholder="1/1/1900" ref={input => (this.choreDate = input)} />
            </div>
            <div className="col-3 col-12-xs inline-block">
              <label htmlFor="chore">Chore</label>
              <br/>
              <input type="text" name="chore" placeholder="Wash Dishes" ref={input => (this.choreType = input)} />
            </div>
            <div className="col-3 col-12-xs inline-block">
              <label htmlFor="deposit">Deposit Amount</label>
              <br/>
              <input type="text" name="deposit" placeholder="1.00" ref={input => (this.choreAmount = input)} />
            </div>
            <div className="col-3 col-12-xs inline-block">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
        <div className="withdrawl-div">
          <h4 className="chores-section-title left">Withdraw Money</h4>
          <form className="left">
              <div className="col-3 col-12-xs inline-block">
                <label htmlFor="deposit">Withdrawl Amount</label>
                <br/>
                <input type="text" name="deposit" value="" placeholder="1.00" />
              </div>
              <div className="col-3 col-12-xs inline-block">
                <input type="submit" value="Submit" />
              </div>
            </form>
        </div>
      </div>

    );
  }
}

export default ChoreUpdate;

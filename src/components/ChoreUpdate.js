import React, { Component } from 'react';
import './ChoreUpdate.css';
import {connect} from 'react-redux';


class ChoreUpdate extends Component {

handleSubmit(event) {
  event.preventDefault();

  let choreDate = this.choreDate;
  let choreType = this.choreType;
  let choreBanking = "Deposit";
  let choreAmount = this.choreAmount;
  let add = parseFloat(this.choreAmount.value);
//  let choreTotal = add.value + 1;
console.log(add.toFixed(2) + " is a " + typeof add);

  let newTotal = 0;

  this.props.choreList.map((chores, index) => {
    let unparsed = chores.choreAmount;
    let parsed = parseFloat(unparsed);
    newTotal = newTotal + parsed;
    return newTotal;
  	}
  );

  let recentTotal = newTotal + add;

  console.log("this  is the recentTotal " + recentTotal + " it is a " + typeof recentTotal);


  this.props.addChore(choreDate.value, choreType.value.trim(), choreBanking, choreAmount.value.trim(), recentTotal.toFixed(2));
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
              <input type="number" name="deposit" placeholder="1.00" ref={input => (this.choreAmount = input)} />
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
const mapStateToProps = state => ({
    choreList: state.choreList
});

export default connect(mapStateToProps)(ChoreUpdate);

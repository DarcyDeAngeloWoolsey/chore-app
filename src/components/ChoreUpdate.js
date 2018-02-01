import React, { Component } from 'react';
import './ChoreUpdate.css';
import {connect} from 'react-redux';


class ChoreUpdate extends Component {

handleSubmit(event) {
  event.preventDefault();

  let initChoreDate = this.choreDate.value;
  let dateSubstring1 = initChoreDate.substr(0, 4);
  let dateSubstring2 = (initChoreDate.substr(5, 9) + "-");
  let choreDate = dateSubstring2.concat(dateSubstring1);

  let choreType = this.choreType.value;
  let choreBankingType = this.choreBanking.value;

  let choreBanking = '';
    if(choreBankingType === "withdrawl") {
      choreBanking = "Withdrawl";
      }
    else if (choreBankingType === "deposit") {
      choreBanking = "Deposit";
    };

  let choreAmount = this.choreAmount.value;
  let add = parseFloat(this.choreAmount.value);
  let newTotal = 0;
  this.props.choreList.map((chores, index) => {
    let unparsed = chores.choreAmount;
    let parsed = parseFloat(unparsed);
    newTotal = newTotal + parsed;
    return newTotal;
  	}
  );
  let choreTotal = newTotal + add;

  this.props.addChore(choreDate, choreType.trim(), choreBanking, choreAmount, choreTotal.toFixed(2));

  document.getElementById("choreForm").reset();
}


  render() {



    return (
      <div className="box row">
        <div className="chore-update-div">
          <h4 className="chores-section-title">Add An Update</h4>
        <form id="choreForm" onSubmit={this.handleSubmit.bind(this)}>

            <div className="col-5 col-12-xs inline-block">
              <label htmlFor="date">Date</label>
              <br/>
            <input type="date" name="date" placeholder="1/1/1900" ref={input => (this.choreDate = input)} required/>
            </div>

            <div className="col-5 col-12-xs inline-block">
              <label htmlFor="chore">Chore/Reason</label>
              <br/>
              <input type="text" name="chore" placeholder="Wash Dishes" ref={input => (this.choreType = input)} required/>
            </div>

            <div className="col-5 col-12-xs inline-block">
              <label htmlFor="choreBanking">Deposit/Withdrawl</label>
              <br/>
              <select name="choreBanking" ref={select => (this.choreBanking = select)}>
               <option value="deposit" selected>Deposit</option>
               <option value="withdrawl">Withdrawl</option>
             </select>
            </div>

            <div className="col-5 col-12-xs inline-block">
              <label htmlFor="amount">Amount</label>
              <br/>
              <input type="number" name="amount" placeholder="1.00" step=".01" ref={input => (this.choreAmount = input)} required />
            </div>
            
            <div className="col-5 col-12-xs inline-block">
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

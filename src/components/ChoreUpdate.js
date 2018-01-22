import React, { Component } from 'react';
import './ChoreUpdate.css';


class ChoreUpdate extends Component {



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
        <form onSubmit={this.onSubmit}>
            <div className="col-3 col-12-xs inline-block">
              <lable for="date">Date</lable>
              <br/>
              <input type="text" name="date" value="" placeholder="1/1/1900" ref={input => this.textInput = input} />
            </div>
            <div className="col-3 col-12-xs inline-block">
              <lable for="chore">Chore</lable>
              <br/>
              <input type="text" name="chore" value="" placeholder="Wash Dishes" ref={input => this.textInput = input} />
            </div>
            <div className="col-3 col-12-xs inline-block">
              <lable for="deposit">Deposit Amount</lable>
              <br/>
              <input type="text" name="deposit" value="" placeholder="1.00" ref={input => this.textInput = input} />
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
                <lable for="deposit">Withdrawl Amount</lable>
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

import React from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = { queryText: 1, responseData: {} };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({queryText: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    let response = await axios(
    {
      url: 'http://anatxt.ml/api/analysis/text', 
      method: 'POST',
      data: {
        text: this.state.queryText
      }
    });
    console.log(response.data);
    this.setState({responseData: {...response.data, lastFetched: new Date()}});
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>AnaTxt</h1>

          <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.queryText} onChange={this.handleChange} />
            <input type="submit" value="Submit" style={{display: 'none'}} />
          </form>
          
          <p className="statusText">{this.state.responseData.lastFetched ? "Fetched at " + this.state.responseData.lastFetched : "No request made yet."}</p>
          
        </header>

        <main className="App-main">
          
        </main>
      </div>
    );
  }

}

export default App;

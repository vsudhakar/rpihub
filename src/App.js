import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
 * Alarm Clock Component
 *
 */
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  
  render() {
    return (

      <React.Fragment>

    {/*  <div>
        <h2>{this.state.date.toLocaleTimeString()}.</h2>
        <h3>Hours: {this.state.date.getHours()}</h3>
        <h3>Minutes: {this.state.date.getMinutes()}</h3>
        <h3>Seconds: {this.state.date.getSeconds()}</h3>
      </div>

      <hr />*/}

      <div className={"App-Clock"}>
        <div className={"App-Clock-Panel App-Clock-Panel-Hour"}>
          {
            this.state.date.getHours() < 10 ?
              "0"+this.state.date.getHours():
              this.state.date.getHours()
          }
        </div>
        <div className={"App-Clock-Panel App-Clock-Panel-Minute"}>
          {
            this.state.date.getMinutes() < 10 ?
              "0"+this.state.date.getMinutes():
              this.state.date.getMinutes()
          }
        </div>
        <div className={"App-Clock-Panel-Seconds"}>
          {
            this.state.date.getSeconds() < 10 ?
              "0"+this.state.date.getSeconds():
              this.state.date.getSeconds()
          }
        </div>
      </div>

      </React.Fragment>

    );
  }

}

/*
 * Menu Bar Component
 *
 */
class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <React.Fragment>
        <button data-id={0} onClick={this.props.selectBind} className="button App-menuButton App-Icon-Slideshow">Slideshow</button>
        <button data-id={1} onClick={this.props.selectBind} className="button App-menuButton App-Icon-Calendar">Calendar</button>
        <button data-id={2} onClick={this.props.selectBind} className="button App-menuButton App-Icon-Clock">Clock</button>
      </React.Fragment>
    );
  }
}

/*
 * Simple ReactJS Google Calendar Component
 *
 */
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <iframe src="https://calendar.google.com/calendar/embed?src=visrut%40gmail.com&ctz=America%2FNew_York" style={{border: 0}} width="800" height="350px" frameborder="0" scrolling="no"></iframe>
    )
  }
}

/* 
 * Simple ReactJS Slideshow Component
 *
 */
class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      this.props.interval
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
    this.setState({
      index: (this.state.index+1)%this.props.src.length
    }, function() {
      console.log("Index: " + this.state.index);
    });
  }
  
  render() {
    return (

      <div className="App-slideshow">
        <img className="App-slideshow-image" src={this.props.src[this.state.index]} />
      </div>

    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selector: 0
    }

    this.selectMainView = this.selectMainView.bind(this);
  }

  selectMainView(event) {
    var selection = event.currentTarget.dataset.id;
    this.setState(prevState => ({
      selector: selection
    }), function() {
      console.log("Updated view");
    });
  }

  render() {
    return (
    <React.Fragment>
      <div className="App-mainView">
        {
         this.state.selector == 0 &&
            <Slideshow  src={["/photos/1.jpg", "/photos/2.jpg", "/photos/3.jpg", "/photos/4.jpg","/photos/5.jpg","/photos/6.jpg", "/photos/7.jpg", "/photos/8.jpg", "/photos/9.png"]} interval={3000}/>          
        }
        {
          this.state.selector == 1 &&
            <Calendar />
        }
        {
          this.state.selector == 2 &&
            <Clock />
        }
      </div>
      <div className="App-bottomBar">
        <MenuBar selectBind={this.selectMainView} />
      </div>
    </React.Fragment>
    )
  }
}

{/*
  ["http://www.visrut.com/photos/calendar_dog.JPG", "http://www.visrut.com/photos/banana_chip.JPG", "http://www.visrut.com/photos/profile_andre.jpg"]
  */}

export default App;
// src/Components/Home/Home.jsx
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      phone: '',
      error: '',
      loading: false,
      navigateToQuiz: false,
    };
  }

  handleClick = () => {
    const { name, age, phone } = this.state;

    if (!name || !age || !phone) {
      this.setState({ error: 'Please fill in all fields.' });
      return;
    }

    if (age <= 0) {
      this.setState({ error: 'Age must be a positive number.' });
      return;
    }

    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, navigateToQuiz: true });
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value, error: '' });
  };

  render() {
    const { name, age, phone, error, loading, navigateToQuiz } = this.state;

    if (navigateToQuiz) {
      return <Navigate to="/Quiz" state={{ name, age, phone }} />;
    }

    return (
      <div className="start-container">
        {loading && <div className="overlay"><div className="spinner center"></div></div>}
        <div className="main-card">
          <img
            src="https://res.cloudinary.com/dfh97e9e4/image/upload/v1728375295/9750807.547e449898cfc_qqhk0d.jpg"
            alt="Logo"
            className="logo"
          />
          {error && <p className="error-message">{error}</p>}
          <label className="label" htmlFor="name">
            Name:
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <label className="label" htmlFor="age">
            Age:
            <input
              id="age"
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <label className="label" htmlFor="phone">
            Phone No:
            <input
              id="phone"
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={this.handleChange}
              className="form-control"
            />
          </label>
          <button className="start-button mt-2" onClick={this.handleClick}>
            Start Game
          </button>
        </div>
      </div>
    );
  }
}

export default Home;

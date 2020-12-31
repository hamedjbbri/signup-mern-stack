import React, { Component } from 'react';
import './App.css';
import axios from 'axios'


export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {

            fullname: '',
            username: '',
            email: '',
            password: '',
            isSubmitted: ''
        }
    }

    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        const { fullname, username, email, password } = this.state
        e.preventDefault();


        const newUser = {
            fullname,
            username,
            email,
            password
        }

        axios.post('http://localhost:4000/app/signup', newUser).then(response => {
            
        console.log('object');
            this.setState({
                isSubmitted: 'Form submitted!'
            })
        })

    }

    render() {
        return (
            <div>
                <div className="container p-5 mt-5 bg-info">
                    <h2 className="bg-danger">{this.state.isSubmitted}</h2>
                    <form onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Fullname" name="fullname" value={this.state.fullname} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </div>

                        <button className="btn btn-warning btn-block">Submit</button>
                    </form>
                </div>

            </div>
        )
    }
}

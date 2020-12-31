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
            isSubmitted: '',
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/app/grab')
        .then(response => {
            this.setState({
                users: response.data
            })
        })
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
            
            this.setState({
                isSubmitted: 'Form submitted!',
                fullname: '',
                username: '',
                email: '',
                password: ''
            }) 

            setTimeout(() => {
                this.setState({
                    isSubmitted: ''
                }) 
            }, 4000);
        })
        window.location.reload();
      
    }


    handleDelete = (userId) => {
       axios.delete('http://localhost:4000/app/delete', {data: {id: userId}})
       .then((data)=>{console.log(data)})
    
        window.location.reload();
    }

    render() {

       const userJSX = this.state.users.map(user => <li className="list-group-item" key={user._id}>{user.fullname},  {user.username} <i className="fa fa-trash" onClick={()=>{this.handleDelete(user._id)}}></i> </li>)
        
      
        return (
  
            <div>
                <div className="container p-5 mt-5 bg-info">
                    <h2 className="bg-warning">{this.state.isSubmitted}</h2>
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

                        <button className="btn bg-danger btn-block" 
                         disabled={
                            !this.state.fullname ||
                            !this.state.username ||
                            !this.state.email ||
                            !this.state.password} >Submit</button>
                    </form>
                 
                     <h5 className="mt-5 text-secondary">List of data</h5>
                    <ul className="list-group">
                    
                    {userJSX}
                    </ul> 
                </div>

            </div>
        )
    }
}

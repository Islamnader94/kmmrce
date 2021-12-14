import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            username: "",
            password: ""
        }
        this.login = this.login.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getPassword = this.getPassword.bind(this);
    }


    getUserName = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    
    getPassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    login = (e) => {
        e.preventDefault();
        let user = {user_name: this.state.username, password: this.state.password};
        ApiService.verifyUser(user)
            .then(res => {
                if(res.data['authenticated'] === true) {
                    window.sessionStorage.setItem("verify", true)
                    this.setState({message : 'User verified successfully.'});
                    this.props.history.push('/teachers');
                } else {
                    window.sessionStorage.setItem("verify", false);
                    console.log("User not available")
                }
            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Login User</Typography>
                <div style={loginStyle}>
                    <TextField style={textStyle} placeholder="username" fullWidth margin="normal" name="username" onChange={this.getUserName}/>
                    <TextField style={textStyle} type="password" placeholder="password" fullWidth margin="normal" name="password" onChange={this.getPassword} />
                    <Button style={buttonStyle} variant="contained" color="primary" onClick={this.login}>Login</Button>
                </div>
            </div>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center',
}

const loginStyle = {
    width: 600,
    margin: 'auto',
    padding: 10
}

const textStyle = {
    padding: 20,
}

const buttonStyle = {
    margin: 'auto',
    display: 'flex',
    width: 200
}

export default Login;


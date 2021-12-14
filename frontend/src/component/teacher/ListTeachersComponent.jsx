import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ViewIcon from '@material-ui/icons/Portrait';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Switch from "react-switch";

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: "",
            teachers: [],
            filteredData: [],
            message: null,
            checked: false,
            verifyStatus: false,
            maxLength: 1
        }
        this.handleChange = this.handleChange.bind(this);
        this.viewTeacher = this.viewTeacher.bind(this);
        this.searchTeacher = this.searchTeacher.bind(this);
        this.importTeacher = this.importTeacher.bind(this);
        this.reloadTeacherList = this.reloadTeacherList.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    componentDidMount() {
        let user_verified = window.sessionStorage.getItem('verify')
        if(user_verified === 'true') {
            this.setState({verifyStatus: true})
        } 
        this.reloadTeacherList();
    }

    searchTeacher = (e) => {
        let temp = e.target.value
        if (this.state.checked === false){
            if (temp.length <= 1) {
            this.setState({filter: temp, maxLength: 1})
            } else {
                e.preventDefault();
                return false;
            }
        } else {
            this.setState({filter: temp, maxLength: 25})
        }
    };

    reloadTeacherList() {
        ApiService.fetchTeachers()
            .then((res) => {
                this.setState({teachers: res.data})
            });
    }

    viewTeacher(id) {
        window.localStorage.setItem("teacherId", id);
        this.props.history.push('/view-teacher');
    }

    importTeacher() {
        window.localStorage.removeItem("teacherId");
        this.props.history.push('/add-teachers');
    }

    login() {
        window.localStorage.removeItem("teacherId");
        this.props.history.push('/login');
    }

    logout() {
        this.setState({verifyStatus: false})
        window.sessionStorage.setItem("verify", false);
    }

    render() {
        let searchLabel = "first letter in last name..."
        const { filter, teachers } = this.state;
        const filteredData = teachers.filter(
            d => {
                let lastName = d.last_name
                let subjects = d.subject
                if (this.state.checked === false){
                    searchLabel = "first letter in last name..."
                    return lastName.toLowerCase().startsWith(filter.toLowerCase())
                } 
                else {
                    searchLabel = "subject..."
                    return subjects.some((subj) => {
                        return subj.name.toLowerCase().indexOf(
                            filter.toLowerCase()) !== -1;
                        }
                    )         
                }
            }).map(d => {
                return (
                    <TableBody>
                        <TableRow key={d.id}>
                            <TableCell align="right">
                                {d.profile_picture.replace(/\s/g, '') === '' || d.profile_picture === '21239.JPG' ?
                                    <FaceIcon /> 
                                :
                                    <img style={image} src={process.env.PUBLIC_URL + `/teachers/${d.profile_picture}`} alt="" /> 
                                }
                            </TableCell>
                            <TableCell align="right">{d.first_name}</TableCell>
                            <TableCell align="right">{d.last_name}</TableCell>
                            <TableCell align="right">{d.email}</TableCell>
                            <TableCell align="right">{d.phone_number}</TableCell>
                            <TableCell align="right">{d.room_number}</TableCell>
                            <TableCell align="right" onClick={() => this.viewTeacher(d.id)}><ViewIcon /></TableCell>
                            <TableCell align="right" style={subjectList}>
                            {d.subject.map((item,i) =>
                                <p key={i}>{item.name}</p>
                            )}
                            </TableCell>

                        </TableRow>
                </TableBody>
                )
            })

        return (
            <div>
                {this.state.verifyStatus === true ?
                    <div style={logoutStyle}>
                        <Button style={authButton} variant="contained" color="primary" onClick={() => this.logout()}>
                            Logout
                        </Button>
                        <Button style={authButton} variant="contained" color="primary" onClick={() => this.importTeacher()}>
                            Import Teachers
                        </Button>
                    </div>
                    :
                    <Button style={authButton} variant="contained" color="primary" onClick={() => this.login()}>
                        Login
                    </Button>
                }
                <Typography variant="h4" style={style}>List Of Teachers</Typography>
                <div style={filterArea}>
                    <span style={switchSpan}>First letter in last name</span>
                    <label style={style}>
                        <Switch onChange={this.handleChange} checked={this.state.checked} />
                    </label>
                    <span style={switchSpan}>Subject</span>
                </div>
                <TextField className="col-6" inputProps={{ maxLength: this.state.maxLength }} style={search} id="standard-basic" label={"Search by" + " " + searchLabel} onChange={this.searchTeacher} /> 
                <Table style={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Picture</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Room Number</TableCell>
                            <TableCell align="right">Teachers Profile</TableCell>
                            <TableCell align="right">Subject</TableCell>
                        </TableRow>
                    </TableHead>
                    {filteredData}
                </Table>

            </div>
        );
    }

}

const filterArea = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const subjectList = {
    fontSize: 12
}

const switchSpan = {
    padding: 20
}

const search = {
    width: 500,
    margin: 'auto',
    display: 'flex',
}

const tableStyle = {
    marginTop: 50
}

const logoutStyle = {
    display: 'flex'
}

const authButton = {
    margin: 20
}

const image = {
    height: 42,
    width: 42
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListUserComponent;
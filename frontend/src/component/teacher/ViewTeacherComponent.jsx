import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';

class EditUserComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            firstName: '',
            lastName: '',
            picture: '',
            email: '',
            phone: '',
            room: '',
            subjects: []
        }
        this.backList = this.backList.bind(this);
        this.loadTeacher = this.loadTeacher.bind(this);
    }

    componentDidMount() {
        this.loadTeacher();
    }

    loadTeacher() {
        ApiService.fetchTeacherById(window.localStorage.getItem("teacherId"))
            .then((res) => {
                this.setState({
                    id: res.data['id'],
                    firstName: res.data['first_name'],
                    lastName: res.data['last_name'],
                    picture: res.data['profile_picture'],
                    email: res.data['email'],
                    phone: res.data['phone_number'],
                    room: res.data['room_number'],
                    subjects: res.data['subject']
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    backList = (e) => {
        e.preventDefault();
        this.props.history.push('/teachers');
            
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Teacher: {this.state.firstName}</Typography>
                <Button variant="contained" color="primary" style={backButton} onClick={this.backList}>Full Teachers List</Button>
                <Card style={useStyles}>
                    <CardActionArea>
                        <CardMedia className={useStyles.media}>
                        {this.state.picture.replace(/\s/g, '') === '' || this.state.picture === '21239.JPG' ?
                            <FaceIcon style={image} /> 
                        :
                            <img style={image} src={process.env.PUBLIC_URL + `/teachers/${this.state.picture}`} alt="" />
                        }
                        </CardMedia>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.firstName + ' ' + this.state.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            ID: {this.state.id}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Email: {this.state.email}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Phone: {this.state.phone}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Room No.: {this.state.room}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        Subjects: 
                        {this.state.subjects && this.state.subjects.map(subject => ( 
                            <Button size="small" color="primary">
                                {subject.name}
                            </Button>
                        ))}
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const useStyles = {
    width: 600,
    margin:'auto'
}

const image = {
    width: 300,
    margin: 'auto',
    display: 'flex'
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

const backButton = {
    margin: 20
}

export default EditUserComponent;
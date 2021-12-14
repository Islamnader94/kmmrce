import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            csvFile: undefined,
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let formData = new FormData()
        formData.append('file', this.state.csvFile)
        ApiService.addTeachers(formData)
            .then(res => {
                this.setState({message : 'Teachers added successfully.'});
                this.props.history.push('/teachers');
            });
    }

    onChange = (e) =>
        this.setState({ csvFile : e.target.files[0] });

    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>Import Teachers</Typography>
                <form style={formContainer}>
                    <input
                        type="file"
                        ref={(input) => { this.filesInput = input }}
                        name="file"
                        icon='file text outline'
                        iconPosition='left'
                        label='Upload CSV'
                        placeholder='UploadCSV...'
                        onChange={this.onChange}
                    />

                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
            </form>
    </div>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddUserComponent;
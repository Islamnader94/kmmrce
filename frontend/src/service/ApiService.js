import axios from 'axios';

const Import_Teacher_URL = 'http://localhost:8000/teachers/import';
const Get_All_Teachers_URL = 'http://localhost:8000/teachers/all'
const Get_Teacher_URL = 'http://localhost:8000/teachers'
const Verify_User_URL = 'http://localhost:8000/teachers/authenticate'


class ApiService {

    fetchTeachers() {
        return axios.get(Get_All_Teachers_URL);
    }

    fetchTeacherById(teacherId) {
        return axios.get(Get_Teacher_URL + '/' + teacherId);
    }

    verifyUser(payload) {
        return axios.post(""+Verify_User_URL, payload)
    }

    addTeachers(file) {
        return axios.post(""+Import_Teacher_URL, file, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

}

export default new ApiService();
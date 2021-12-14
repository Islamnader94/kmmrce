import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListTeacherComponent from "./teacher/ListTeachersComponent";
import AddTeacherComponent from "./teacher/AddTeachersComponent";
import ViewTeacherComponent from "./teacher/ViewTeacherComponent";
import Login from "./teacher/Login";
import React from "react";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={ListTeacherComponent} />
                        <Route path="/teachers" component={ListTeacherComponent} />
                        <Route path="/add-teachers" component={AddTeacherComponent} />
                        <Route path="/view-teacher" component={ViewTeacherComponent} />
                        <Route path="/login" component={Login} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;
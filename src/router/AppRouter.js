import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { CalendarApp } from '../CalendarApp'
import { LoginScreen } from '../components/auth/LoginScreen'

export const AppRouter = () => {
    return (
        <Router>

            <Switch>

                <Route exact path="/" component={CalendarApp} />
                    

                <Route exact path="/login" component={LoginScreen} />

                <Redirect to="/" />
                   

            </Switch>
        </Router>
    )
}

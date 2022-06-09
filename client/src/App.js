import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBarUser from "./components/navigation_bar/NavigationBarUser";
import NavigationBarNoUser from "./components/navigation_bar/NavigationBarNoUser";
import Home from "./components/home/Home";
import LogIn from "./components/user_authentication/login/LogIn";
import SignUp from "./components/user_authentication/signup/SignUp";
import Footer from "./components/footer/Footer";
import LearnPage from "./components/learn_pages/LearnPage";
import EditMain from "./components/edit/EditMain";
import UserContext from "./components/user_authentication/UserContext";

/*
    Functional component to render the navigation bar:
        - NavigationBarNoUser - if a user is not logged in
        - NavigationBarUser - if a user is logged in
 */
function NavigationBar(props) {
    const userLoggedIn = props.userLoggedIn
    if (userLoggedIn) {
        return <NavigationBarUser />
    }
    return <NavigationBarNoUser />
}

export default class App extends React.Component {

    static contextType = UserContext

    render() {
        return (
            <BrowserRouter>
                <NavigationBar
                    userLoggedIn={Object.keys(this.context.user).length !== 0}
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/learn" element={<LearnPage />} />
                    <Route path="/edit" element={<EditMain />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }
}

/*

    TODO: - Forms validation - make it look better (looks horrible on small screens, doesn't look too good on big
     screens either ???
          - CSS - forms (they don't look good on small screens)
          - finish edit deck link to backend

 */
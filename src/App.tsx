import React, { Component } from "react";
import { HashRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from "./components/auth/login/login";
import Feed from "./components/feed/feed";
import './toast-styles.css'; // Import your custom CSS here
import Profile from "./components/profile/profile";
import { Navigate, Route, Routes } from "react-router";
import Users from "./components/users";
import Comments from "./components/comments";

// Import your functional Layout component
import Layout from "./components/layout/layout";
import Register from "./components/auth/register/register";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/"  element={<Navigate replace to="/login" />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/protected/*" element={<Layout />}>
            {/* Nested routes within Layout */}
            <Route path="feed" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="users" element={<Users />} />
              <Route path="comments" element={<Comments />} />
                <Route path="comments/:id" element={<Comments />} />
          </Route>
        </Routes>
      </Router>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

import {Router, Route, Switch, HashRouter, BrowserRouter} from "react-router-dom";
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from "./pages/SignUpPage";
import BlogPage from "./pages/BlogPage";
import NewBlogPage from "./pages/NewBlogPage";
import axios from "axios";
import './axios'
import AxiosInterceptors from "./axios";
import EditBlogPage from "./pages/EditBlogPage";
import InfoPage from "./pages/InfoPage";
ReactDOM.render(
  // <ThemeProvider theme={theme}>
  //   {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
  //   <CssBaseline />
  //   <Pricing/>
  //   {/*<App />*/}
  // </ThemeProvider>,
    <div >
        <AxiosInterceptors ></AxiosInterceptors>
    <BrowserRouter >
        <Switch>
            <Route path='/Newblog' component={NewBlogPage} />
            <Route path='/Info' component={InfoPage} />
            <Route path="/SignUp" component={SignUpPage} />
            <Route path="/SignIn" component={SignInPage} />
            <Route path='/blog/:id' component={BlogPage} />
            <Route path='/EditBlog/:id' component={EditBlogPage} />
            <Route path="/" component={HomePage} />
        </Switch>
    </BrowserRouter>
    </div>,
  document.querySelector('#root'),
);

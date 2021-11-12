import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import RecipeReviewCard from "../components/HomeBlogCard";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import BackToTop from '../components/BackToTop'
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import PropTypes from "prop-types";
import Copyright from '../components/Copyright'
import Sidebar from "../components/Sidebar";

import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import SwipeableTemporaryDrawer from "../components/Drawer";
import Pagination from "@material-ui/lab/Pagination";
import BlogCard from "../components/HomeBlogCard";
import withStyles from "@material-ui/core/styles/withStyles";
import AxiosInterceptors from "../axios";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from 'axios';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Avatar from "@material-ui/core/Avatar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {sidebarValue} from '../components/Sidebar';
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Footer, {footers} from "../components/footer";
import SelectInput from "@material-ui/core/Select/SelectInput";
import TextField from "@material-ui/core/TextField";
const useStyles = theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    blogCard:{

        direction:"column",
        // justify:"center",
        // alignItems:"center",
    },
    mainGrid: {
        marginTop: theme.spacing(3),
        //direction:"row"
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        direction:"col",
    },
    sidebarDesktop:{
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
});

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];



class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blogsData:{"records":[],"pages":1},
            //myblogChecked:false,
            blogsMode:1,
            selectName:'',//筛选的用户名
            openselectName:false,
            OrderBy:"created",
            OrderMode:"Desc",
            gotData:false,
            pageNow:1,


        };

    }
    getBlogs(){
        const {pageNow,OrderMode,selectName,OrderBy,blogsMode}=this.state
        const userJwt = JSON.parse(localStorage.getItem("jwt"));

        console.log("page:",pageNow)
        axios.get('blogs'+'?currentPage='+pageNow+'&mode='+blogsMode+'&Username='+selectName+'&OrderBy='+OrderBy+'&OrderMode='+OrderMode
            ,{

                headers:{

                        "Authorization":(userJwt==null)?''
                            :userJwt.jwt


                }

            })
            //.then(res =>JSON.stringify(res))
            .then((body) => {

                console.log(body.data.data)
                if(body.data)
                    this.setState({
                        blogsData:body.data.data,
                        gotData:true

                    },()=>console.log(this.state.blogsData))
            })
    }

    componentDidMount(){
        this.getBlogs()

    }

    RefreshBlogs(){
        console.log("刷新主页")
        this.getBlogs();
    }
    PageChange=(event, page)=>{
        console.log("page:",page)
        this.setState({ pageNow: page})
        this.getBlogs()
    }
    blogsModeMenuChange = (event) => {
        this.setState({ blogsMode: event.target.value },()=>{
            this.getBlogs();
        });//更改按钮状态

    };
    OrderByMenuChange = (event) => {
        this.setState({ OrderBy: event.target.value },()=>{
            this.getBlogs();
        });//更改按钮状态

    };
    OrderModeMenuChange = (event) => {
        this.setState({ OrderMode: event.target.value },()=>{
            this.getBlogs();
        });//更改按钮状态

    };
    filtrateUserName=(event)=>{
        this.setState({ selectName: event.target.value },()=>{
            this.getBlogs();
        });

    }

    render()
    {
        // const blogsData=this.state.blogsData

        const {classes} = this.props
        let list=this.state.blogsData.records
        // console.log(list)
        return (
            <React.Fragment>
                <CssBaseline/>

                <PrimarySearchAppBar history={ this.props.history } />

                <Toolbar id="back-to-top-anchor"/>

                <Container>
                    {/*<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>*/}
                    {/*    Pricing*/}
                    {/*</Typography>*/}
                    {/*<RecipeReviewCard/>*/}

                    <Grid container spacing={0}>
                        <Grid container spacing={3} xs className={classes.blogCard}>
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox checked={this.state.myblogChecked} onChange={this.CheckboxChange} name="myblogChecked" />}*/}
                            {/*    label="MY BLOGS"*/}
                            {/*/>*/}

                            <Grid className={classes.formControl}>
                                <Button variant="contained" onClick={()=>this.props.history.push('/newblog')}><Typography>NewBlog</Typography></Button>
                                <Button onClick={()=>this.RefreshBlogs}><Typography>Refresh</Typography></Button>
                                <Grid ms={3}>
                                    <InputLabel id="demo-simple-select-label">Selector</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        //native
                                        value={this.state.blogsMode}
                                        onChange={this.blogsModeMenuChange}
                                    >
                                        <MenuItem value={1}>All</MenuItem>
                                        <MenuItem value={2}>Mine</MenuItem>
                                        <MenuItem value={3}>Others</MenuItem>
                                        <MenuItem value={4}>Someone</MenuItem>
                                        {/*<MenuItem value={2}>My Blogs</MenuItem>*/}

                                    </Select>
                                    <TextField onChange={this.filtrateUserName} id="outlined-basic" label="请输入需要查询的用户名" variant="outlined" />
                                </Grid>
                                <Grid ms={3}>
                                    <InputLabel id="demo-simple-select-label">OrderBy</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        //native
                                        value={this.state.OrderBy}
                                        onChange={this.OrderByMenuChange}
                                    >
                                        <MenuItem value="created">Created Time</MenuItem>
                                        <MenuItem value="title">Title</MenuItem>
                                        <MenuItem value="user_id">User Id</MenuItem>
                                        <MenuItem value="id">Blog Id</MenuItem>
                                        <MenuItem value="description">Description</MenuItem>
                                        <MenuItem value="content">Content</MenuItem>
                                        {/*id,created,description,title,user_id,content*/}
                                        {/*<MenuItem value={2}>My Blogs</MenuItem>*/}

                                    </Select>
                                </Grid>
                                <Grid ms={3}>
                                    <InputLabel id="demo-simple-select-label">OrderMode</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        //native
                                        value={this.state.OrderMode}
                                        onChange={this.OrderModeMenuChange}
                                    >
                                        <MenuItem value="Desc">Desc</MenuItem>
                                        <MenuItem value="Asc">Asc</MenuItem>
                                        {/*<MenuItem value={2}>My Blogs</MenuItem>*/}

                                    </Select>
                                </Grid>
                            </Grid>

                            {list.map((post) => (
                                <BlogCard key={post.id} post={post} history={this.props.history} RefreshBlogs={this.RefreshBlogs.bind(this)}/>
                            ))}
                            <Pagination count={this.state.blogsData.pages} color="secondary" onChange={this.PageChange}/>
                        </Grid>
                        <Grid xs={3} className={classes.sidebarDesktop}>

                            <Sidebar
                                title={sidebarValue.title}
                                description={sidebarValue.description}
                                archives={sidebarValue.archives}
                                social={sidebarValue.social}
                            />
                        </Grid>

                        {/*{renderSidebar}*/}
                        {/*{renderMobileSidebar}*/}



                    </Grid>


                </Container>


                {/* End footer */}
                <BackToTop/>
                <Footer/>

            </React.Fragment>
        );
    }
}
export default withStyles(useStyles)(HomePage)
// export default class HomePage extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             blogsData:{records:[]}
//         };
//
//     }
//     getBlogs(page){
//         console.log(page)
//         fetch('http://localhost:8080/blogs'+'?currentPage='+page
//             ,{
//             method:'GET',
//
//         })
//             .then(res =>res.json())
//             .then((body) => {
//                 console.log(body.data.records)
//                 this.setState({
//                     blogsData:body.data
//                 })
//             })
//     }
//     componentDidMount(){
//         this.getBlogs(1)
//
//     }
//     render(){
//         const blogsData=this.state.blogsData
//         return (
//             <HomePageFunc
//                 blogsData={blogsData}
//                 getBlogs={this.getBlogs.bind(this)}//传给子组件
//             />
//         )
//     }
// }

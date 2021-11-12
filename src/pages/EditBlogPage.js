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
import Blog from "../components/Blog";
import MarkdownEditor from "../components/MarkdownEditor";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import {sidebarValue} from '../components/Sidebar';
import CircularProgress from "@material-ui/core/CircularProgress";
import Footer, {footers} from "../components/footer";
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
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
    circular: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
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



class EditBlogPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            blogData:{"id": 1,
                "userId": 1,
                "title": "生活就像海洋，只有意志坚强的人才能到达彼岸",
                "description": "这里是摘要哈哈哈",
                "content": "",
                "created": "2020-05-21T22:08:42",
                "status": 0},
            loading: false,


        };
        // this.getBlogById = this.getBlogById.bind(this)

    }
    getBlogById(id){
        console.log(id)
        axios.get('blog/'+id
            ,{
                // method:'GET',

            })
            // .then(res =>res.json())
            .then((body) => {
                console.log(body.data.data)
                this.setState({
                    blogData:body.data.data,
                    loading:true
                },()=>{
                    console.log(this.state.blogData)})

            })
    }
    componentWillMount(){
        console.log("componentWillMount")
        this.getBlogById(this.props.match.params.id)
        console.log("componentWillMount")

    }
    titleChange=(event)=>{
        let prevData=this.state.blogData
        let data = Object.assign({}, prevData, { title: event.target.value })
        this.setState({blogData:data})
    }
    descriptionChange=(event)=>{
        let prevData=this.state.blogData
        let data = Object.assign({}, prevData, { description: event.target.value })
        this.setState({blogData:data})
    }
    // handleChangePage(event, page){
    //     this.getBlogs(page);
    // }
    bindRef = ref => { this.MarkdownEditor = ref }
    render()
    {
        const id =this.props.match.params.id
        //const blogsData=this.state.blogsData
        const {classes} = this.props
        let data=this.state.blogData
        console.log(data)
        if (this.state.loading===false)
            {
                return(
                    <div className={classes.circular}>
                        <CircularProgress />

                    </div>
            )
            }
            else
        return (


                    <React.Fragment>
                        <CssBaseline/>

                        <PrimarySearchAppBar history={this.props.history}/>

                        <Toolbar id="back-to-top-anchor"/>

                        <Container>
                            {/*<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>*/}
                            {/*    Pricing*/}
                            {/*</Typography>*/}
                            {/*<RecipeReviewCard/>*/}

                            <Grid container spacing={0} direction={"row"}>
                                {/*<Grid ms={12}>*/}
                                {/*    /!*<Typography >{id}</Typography>*!/*/}

                                {/*</Grid>*/}

                                <Grid xs>
                                    {/*<Typography >{id}</Typography>*/}
                                    <Typography variant="h2" color="textPrimary" gutterBottom>
                                        Edit Blog
                                    </Typography>
                                    <TextField
                                        id="outlined-textarea-title"
                                        label="Title"
                                        placeholder="Placeholder"
                                        multiline
                                        variant="outlined"
                                        value={this.state.blogData.title}
                                        onChange={this.titleChange}
                                    />
                                    <TextField
                                        id="outlined-textarea-description"
                                        label="Description"
                                        placeholder="Placeholder"
                                        multiline
                                        variant="outlined"
                                        value={this.state.blogData.description}
                                        onChange={this.descriptionChange}
                                    />
                                    {/*<Blog blogData={this.state.blogData}/>*/}
                                    <Grid xs={11}>
                                        <MarkdownEditor triggerRef={this.bindRef} content={this.state.blogData.content}
                                                        history={this.props.history}/>
                                        <Button
                                            onClick={() => this.MarkdownEditor.PostMD(id, data.title, data.description)}>Submit</Button>
                                    </Grid>
                                </Grid>
                                <Grid xs={3} className={classes.sidebarDesktop}>
                                    <Sidebar
                                        title={sidebarValue.title}
                                        description={sidebarValue.description}
                                        archives={sidebarValue.archives}
                                        social={sidebarValue.social}
                                    />
                                </Grid>


                            </Grid>
                            {/*<Typography variant="h5" align="center" color="textSecondary" component="p">*/}
                            {/*    Quickly build an effective pricing table for your potential customers with this layout.*/}
                            {/*    It&apos;s built with default Material-UI components with little customization.*/}
                            {/*</Typography>*/}

                        </Container>


                        {/* End footer */}
                        <BackToTop/>
                        <Footer/>

                    </React.Fragment>

        );
    }
}
export default withStyles(useStyles)(EditBlogPage)


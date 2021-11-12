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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CommentCard from "../components/CommentCard";
// import TabPanel from "@material-ui/lab/TabPanel";
const useStyles = theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },

});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class InfoPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tabValue:0,
            receivedComment:[],
            gotData:false,

        };

    }
    getBlogs(){
        // const {}=this.state
        const userJwt = JSON.parse(localStorage.getItem("jwt"));

        // console.log("page:",pageNow)
        axios.get('comment/received'
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
                        receivedComment:body.data.data,
                        gotData:true

                    },()=>console.log(this.state.receivedComment))
            })
    }

    componentDidMount(){
        this.getBlogs(1,1,"created","Desc")

    }
    tabChange = (event, newValue) => {
        this.setState({tabValue:newValue});
    };

    render()
    {
        // const blogsData=this.state.blogsData

        const {classes} = this.props

        const {tabValue}=this.state

        // console.log(list)
        return (
            <React.Fragment>
                <CssBaseline/>

                <Container>
                    <AppBar position="static">
                        <Tabs value={tabValue} onChange={this.tabChange} aria-label="simple tabs example">
                            <Tab label="Received Comment" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0}>
                        {this.state.receivedComment.map((post) => (
                            <CommentCard key={post.id} post={post} history={this.props.history} />
                        ))}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        Item Three
                    </TabPanel>
                </Container>


                {/* End footer */}
                <BackToTop/>
                <Footer/>

            </React.Fragment>
        );
    }
}
export default withStyles(useStyles)(InfoPage)

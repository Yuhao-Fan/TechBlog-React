import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import axios from 'axios';
import BlogCard from "./HomeBlogCard";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const useStyles = theme => ({
    paper: {
        padding: '6px',
    },
    time:{
        width: '20px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
});
class CustomizedTimeline extends React.Component{
// export default function CustomizedTimeline() {
//     const classes = useStyles();
    constructor(props) {
        super(props);
        this.state = {
            blogId:this.props.blogId,
            commentData:[],
        };

    }


    componentDidMount(){
        this.getCommentByBlogId();

    }
    getCommentByBlogId(){
        console.log(this.state.blogId)
        axios.get('/comment?blogId='+this.state.blogId
            ,{


            })
            .then((body) => {
                console.log(body.data.data)
                this.setState({
                    commentData:body.data.data
                })
            })
    }
    setcommentValue=(event)=>{
        this.setState({newcommentValue:event.target.value});
    }
    submitComment(){
        const userJwt = JSON.parse(localStorage.getItem("jwt"));
        if (userJwt==null){
            this.CustomizedSnackbars.handleClick("请登陆后评论","error");
        }
        else {
            axios.post('comment/add', {
                    blogId: this.state.blogId,
                    content: this.state.newcommentValue
                }, {
                    headers: {
                        // 'content-type':'application/json',
                        // "Authorization":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjE1NzM3NjA0LCJleHAiOjE2MTYzNDI0MDR9.fb5mDUS76XKCG4PgNhySWo6XLMO0PDSbnty-5MBFcEr8iZC01y8DX9MHNu9MlSQAQUY4oxNSjbpiN1pADR8n4w"
                        "Authorization": userJwt.jwt
                    }
                }
            ).then(() => {
                this.getCommentByBlogId();
                // this.forceUpdate();
            });
        }

        // .then(res =>res.json())





    }

    render() {
        let list=this.state.commentData
        const {classes} = this.props;
        return (
            <Grid>
            <Timeline align="alternate">
                {list.map((comment) => (
                    <TimelineItem>
                        {/*<Grid xs={12} sm={1}>*/}
                            <TimelineOppositeContent className={classes.time}>
                                <Typography variant="body2" color="textSecondary">
                                    {comment.created}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                {/*<TimelineDot>*/}
                                    <Avatar alt="Remy Sharp" src={comment.avatar} />
                                {/*</TimelineDot>*/}
                                <TimelineConnector/>
                            </TimelineSeparator>
                        {/*</Grid>*/}
                        {/*<Grid xs={12} sm={10}>*/}

                            <TimelineContent >
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                        {comment.username}
                                    </Typography>
                                    <Typography>{comment.content}</Typography>
                                </Paper>
                            </TimelineContent>
                        {/*</Grid>*/}

                    </TimelineItem>
                ))}

            </Timeline >
        <Grid xs={12} justify="center" container direction="column"
        >
            <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={4}
                // defaultValue="Default Value"
                variant="outlined"
                onChange={this.setcommentValue}

            />
        </Grid>
        <Button onClick={this.submitComment.bind(this)}>提交评论</Button>
            </Grid>
        );
    }
}
export default withStyles(useStyles)(CustomizedTimeline);

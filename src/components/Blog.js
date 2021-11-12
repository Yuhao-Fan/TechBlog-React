import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from "@material-ui/core/Paper";
import Markdown from "./Markdown";

const post1="# Sample blog post\n" +
    "\n" +
    "#### April 1, 2020 by [Olivier](/)\n" +
    "\n" +
    "This blog post shows a few different types of content that are supported and styled with\n" +
    "Material styles. Basic typography, images, and code are all supported.\n" +
    "You can extend these by modifying `Markdown.js`."
// const posts = [post1, post2, post3];
import MarkdownEditor from './MarkdownEditor'
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomizedTimeline from "./Comment";
import SpeedDials from "./Dial";
const useStyles = theme => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
        marginLeft:20
    },
    title: {
        margin: theme.spacing(1, 1),
    },
})

class Blog extends React.Component{
//export default function Blog(props) {
    //const classes = useStyles();
    bindRef = ref => { this.MarkdownEditor = ref }
    render(){
    const  blogData  = this.props.blogData;
    const {classes} = this.props;
    const blogId=blogData.id
    console.log(blogId)
    return (
        // <Grid item xs={12} md={8}>
        //     <Typography variant="h6" gutterBottom>
        //         {title}
        //     </Typography>
        //     <Divider />
        //     {posts.map((post) => (
        //         <Markdown className={classes.markdown} key={post.substring(0, 40)}>
        //             {post}
        //         </Markdown>
        //     ))}
        // </Grid>
        <Grid xs={12}>
            <Paper elevation={5}>
                {/*<TextField*/}
                {/*    id="outlined-multiline-static"*/}
                {/*    label="Multiline"*/}
                {/*    multiline*/}
                {/*    rows={4}*/}
                {/*    defaultValue="Default Value"*/}
                {/*    variant="outlined"*/}
                {/*/>*/}
                <Typography variant="h3" gutterBottom className={classes.title}>
                    {blogData.title}
                </Typography>
                <Divider />
                <Typography variant="h5" gutterBottom className={classes.title}>
                    {blogData.description}
                </Typography>

                <Divider />
                {/*<Typography>{post2}</Typography>*/}
                {/*<MarkdownEditor triggerRef={this.bindRef} />*/}
                {/*<Button onClick={()=>this.MarkdownEditor.PostMD()}>1</Button>*/}
                {/*{posts.map((post) => (*/}
                <Markdown className={classes.markdown}>
                    {/*{post1}*/}
                    {blogData.content}
                </Markdown>
                <Divider />

                <CustomizedTimeline blogId={blogId}/>
                    {/*))}*/}

            </Paper>

        </Grid>
    );}
}
export default withStyles(useStyles)(Blog)
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import axios from "axios";
import {ThumbDownAltRounded, ThumbUpAltRounded} from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
const useStyles = theme => ({
    root: {
        maxWidth: 800,

    },
    media: {
        height: 0,
        //paddingTop: '56.25%', // 16:9=56.25%
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});
class BlogCard extends React.Component{
//export default function RecipeReviewCard(props) {
    constructor(props) {
        super(props);
        this.state={
            expanded:false,
            openCardHeaderMenu:null,
            like:false,
            dislike:false,
            collect:false,
            share:false
        }
    }

    render()
    {

    const {classes} = this.props;
    //const classes = this.useStyles();
    //const [expanded, setExpanded] = React.useState(false);
    const post  = this.props.post
    const {expanded,openCardHeaderMenu,like,dislike,collect,share}=this.state
    const handleExpandClick = () => {
        // setExpanded(!expanded);
        this.setState({expanded:!expanded})
    };
    const ClickLike=()=>{
        this.setState({like:!like})
        const userJwt = JSON.parse(localStorage.getItem("jwt"));
        console.log(userJwt)
        axios.get(
            'blog/like?isadd=' + !like + '&blogId=' + post.id,
            {
                headers:{
                    "Authorization":(userJwt==null)?''
                        :userJwt.jwt
                }
            }
        ).then (
            ()=>{}
        )

    }
    const ClickDislike=()=>{
        this.setState({dislike:!dislike})
        const userJwt = JSON.parse(localStorage.getItem("jwt"));
        axios.get(
            'blog/dislike?isadd=' + !dislike + '&blogId=' + post.id,
            {
                headers:{
                    "Authorization":(userJwt==null)?''
                        :userJwt.jwt
                }
            }

        ).then (
            ()=>{}
        )

    }
    const ClickCollect=()=>{
        this.setState({collect:!collect})
        const userJwt = JSON.parse(localStorage.getItem("jwt"));
        axios.get(
            'blog/collect?isadd=' + !collect + '&blogId=' + post.id,
            {
                headers:{
                    "Authorization":(userJwt==null)?''
                        :userJwt.jwt
                }
            }

        ).then (
            ()=>{}
        )

    }
    const ClickShare=()=>{
        this.setState({share:!share})
        const userJwt = JSON.parse(localStorage.getItem("jwt"));
        axios.get(
            'blog/share?isadd=' + !share + '&blogId=' + post.id,
            {
                headers:{
                    "Authorization":(userJwt==null)?''
                        :userJwt.jwt
                }
            }

        ).then (
            ()=>{}
        )

    }

    const handleMenuClick = (event) => {
        this.setState({openCardHeaderMenu:event.currentTarget});
    };
    // const [openCardHeaderMenu, setopenCardHeaderMenu] = React.useState(null);
    const handleCardMenuClose = () => {
        this.setState({openCardHeaderMenu:null});
    };
    const CardMenuEdit = () => {
        handleCardMenuClose();
        this.props.history.push('/EditBlog/'+post.id)
    };
    const CardMenuDelete = () => {
        console.log("post.id ",post.id )
        handleCardMenuClose();
        axios.get('removeBlog', {
            params: { 'blogId': post.id },
            headers:{
                'content-type':'application/json',
                'Authorization':JSON.parse(localStorage.getItem("jwt")).jwt
            },

        }).then((res)=>{
            this.props.RefreshBlogs()
        })




    };
    // const openCardHeaderMenu=this.state.openCardHeaderMenu
    return (
        <Grid item xs={11}>

            <Card elevation={5}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <div>
                            <IconButton aria-label="settings" onClick={handleMenuClick}>
                                <MoreVertIcon/>
                            </IconButton>
                            {/*<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>*/}
                            {/*    Open Menu*/}
                            {/*</Button>*/}
                            <Menu
                            id="simple-menu"
                            anchorEl={openCardHeaderMenu}
                            keepMounted
                            open={Boolean(openCardHeaderMenu)}
                            onClose={handleCardMenuClose}
                            >
                                <MenuItem onClick={CardMenuEdit}>Edit</MenuItem>
                                <MenuItem onClick={CardMenuDelete}>Delete</MenuItem>
                                {/*<MenuItem onClick={handleCardMenuClose}>Logout</MenuItem>*/}
                            </Menu>
                        </div>
                    }

                    title={post.userId}
                    subheader={post.created}
                />
                <Tooltip title="More">
                    <CardActionArea onClick={ ()=>{
                        this.props.history.push(
                             '/blog/'+post.id,

                        );}}>
                        {/*<a href={"/blog"}>*/}
                        <CardMedia
                            className={classes.media}
                            //image="/static/images/cards/paella.jpg"
                            image={post.image}
                            title={post.imageText}
                        />
                        <CardContent>
                            <Typography variant="body2" component="p">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.description}
                            </Typography>
                        </CardContent>
                        {/*</a>*/}
                    </CardActionArea>
                </Tooltip>
                <CardActions disableSpacing>
                    <Tooltip title="Like">
                        <IconButton disabled={this.state.dislike} onClick={ClickLike} aria-label="add to likes">
                            <ThumbUpAltRounded color={this.state.like?"secondary":"action"}/>
                        </IconButton>
                    </Tooltip>

                    <Typography>
                        {post.likenum+this.state.like}
                    </Typography>
                    <Tooltip title="Dislike">
                        <IconButton disabled={this.state.like} onClick={ClickDislike} aria-label="add to dislikes ">
                            <ThumbDownAltRounded color={this.state.dislike?"secondary":"action"}/>
                        </IconButton>

                    </Tooltip>
                    <Typography>
                        {post.dislikenum+this.state.dislike}
                    </Typography>
                    <Tooltip title="Collect">
                        <IconButton onClick={ClickCollect} aria-label="add to collections ">
                            <CollectionsBookmarkRoundedIcon color={this.state.collect?"secondary":"action"}/>
                        </IconButton>

                    </Tooltip>
                    <Typography>
                        {post.collectnum+this.state.collect}
                    </Typography>
                    <Tooltip title="Share">
                        <IconButton onClick={ClickShare} aria-label="share">
                            <ShareIcon color={this.state.share?"secondary":"action"}/>
                        </IconButton>
                    </Tooltip>
                    <Typography>
                        {post.sharenum+this.state.share}
                    </Typography>

                    <Tooltip title="More">
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>

                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {post.content}
                        {/*<Typography paragraph>Method:</Typography>*/}
                        {/*<Typography paragraph>*/}
                        {/*    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10*/}
                        {/*    minutes.*/}
                        {/*</Typography>*/}
                        {/*<Typography paragraph>*/}
                        {/*    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high*/}
                        {/*    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly*/}
                        {/*    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken*/}
                        {/*    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and*/}
                        {/*    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add*/}
                        {/*    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.*/}
                        {/*</Typography>*/}
                        {/*<Typography paragraph>*/}
                        {/*    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook*/}
                        {/*    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to*/}
                        {/*    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook*/}
                        {/*    again without stirring, until mussels have opened and rice is just tender, 5 to 7*/}
                        {/*    minutes more. (Discard any mussels that don’t open.)*/}
                        {/*</Typography>*/}
                        {/*<Typography>*/}
                        {/*    Set aside off of the heat to let rest for 10 minutes, and then serve.*/}
                        {/*</Typography>*/}
                    </CardContent>
                </Collapse>
            </Card>

        </Grid>
    )
}
}
export default withStyles(useStyles)(BlogCard);

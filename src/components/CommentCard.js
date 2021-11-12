import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = theme => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
class CommentCard extends React.Component{


    render() {
        const {classes} = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        const post  = this.props.post
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {"Time："+post.created}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {"User："+post.username}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {"Comment your blog called："+post.title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {"Said:"+post.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>{this.props.history.push(
                        '/blog/'+post.id,

                    );}}>Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}
export default withStyles(useStyles)(CommentCard)


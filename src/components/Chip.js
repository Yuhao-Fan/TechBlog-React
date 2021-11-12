import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import BlogCard from "./HomeBlogCard";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
});

class Chips extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tagId:1,
        };

    }
    render() {

        const {classes} = this.props;

        const handleDelete = () => {
            console.info('You clicked the delete icon.');
        };

        const handleClick = () => {
            console.info('You clicked the Chip.');
        };

        return (
            <div className={classes.root}>
                {list.map((post) => (
                    <Chip key={post.id} label={post.name} onClick={() => this.setState()}/>
                ))}
            </div>
        );
    }
}
export default withStyles(useStyles)(Chips);
import React from 'react';

import withStyles from "@material-ui/core/styles/withStyles";
import Vditor from "vditor";

const useStyles = theme => ({

});


class SearchBar extends React.Component{
    constructor (props) {
        super(props)
        this.state={
            vditor:Vditor,
            open:false,
            severity:"",
            msg:"",
            content:this.props.content,

        }
    }
render() {
    const {classes} = this.props;

    return (
        <div></div>

    );
}
}
export default withStyles(useStyles)(SearchBar);

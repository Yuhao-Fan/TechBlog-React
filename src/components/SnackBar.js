import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/core/styles/withStyles";
import Vditor from "vditor";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
});

class CustomizedSnackbars extends React.Component{
    constructor (props) {
        super(props)
        this.state={
            open:false,
            data:"",
            type:"",


        }
        // this.handleClick=this.handleClick.bind(this)
    }
    componentDidMount(){
        this.props.onRef(this)
    }
    handleClick(data, type) {
        // setData(data);
        // setType(type);
        this.setState({data:data});
        this.setState({type:type});
        // setOpen(true);
        this.setState({open:true});
    };
    handleClose(event, reason){
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open:false})
    };

// export default function CustomizedSnackbars() {
    render() {

        const {classes} = this.props;
        // const classes = useStyles();
        // const [open, setOpen] = React.useState(false);
        // const [data, setData] = React.useState("this.props.data");
        // const [type, setType] = React.useState("");


        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.setState({open:false});
            // setOpen(false);
        };
        console.log("显示snackbar")
        return (
            // <div className={classes.root}>
            //     <Button variant="outlined" onClick={handleClick}>
            //         Open success snackbar
            //     </Button>
            <Snackbar open={this.state.open} autoHideDuration={2000} onClose={()=>this.handleClose()}>
                <Alert onClose={()=>this.handleClose()} severity={this.state.type}>
                    {this.state.data}
                </Alert>
            </Snackbar>
            //     <Alert severity="error">This is an error message!</Alert>
            //     <Alert severity="warning">This is a warning message!</Alert>
            //     <Alert severity="info">This is an information message!</Alert>
            //     <Alert severity="success">This is a success message!</Alert>
            // </div>
        );
    }
}
export default withStyles(useStyles)(CustomizedSnackbars);

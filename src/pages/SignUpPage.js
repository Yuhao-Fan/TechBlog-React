import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright'
import axios from 'axios';
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsData: {records: []},
            RememberMe:false
        };
    }
    // const classes = useStyles();
    SignUpClick= () => {
        console.log(document.getElementById('username').value)
        axios.post('signup', {
            username:document.getElementById('username').value,
            password:document.getElementById('password').value
        })
            .then((res)=>{

                // const jwt=res.headers['authorization']
                // console.log(jwt);
                // let expireTime=86400;
                // if (this.state.RememberMe)
                // {
                //     expireTime=604800;
                // }
                // console.log(expireTime);
                // const jwtExpire = {
                //     jwt,
                //     expire: new Date().getTime() + expireTime
                // };
                // localStorage.setItem("jwt", JSON.stringify(jwtExpire))
                // localStorage.setItem("userData", JSON.stringify(res.data.data))
                // console.log(JSON.parse(localStorage.getItem("userData")).avatar);
                // this.props.history.replace('/')


            })
        //console.log(document.getElementById('username').value)
    }
    render() {

        const {classes} = this.props
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <TextField*/}
                            {/*        autoComplete="fname"*/}
                            {/*        name="firstName"*/}
                            {/*        variant="outlined"*/}
                            {/*        required*/}
                            {/*        fullWidth*/}
                            {/*        id="firstName"*/}
                            {/*        label="First Name"*/}
                            {/*        autoFocus*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <TextField*/}
                            {/*        variant="outlined"*/}
                            {/*        required*/}
                            {/*        fullWidth*/}
                            {/*        id="lastName"*/}
                            {/*        label="Last Name"*/}
                            {/*        name="lastName"*/}
                            {/*        autoComplete="lname"*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.SignUpClick}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/SignIn" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }
}
export default withStyles(useStyles)(SignUpPage)

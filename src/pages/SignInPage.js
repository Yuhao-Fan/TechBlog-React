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
import withStyles from "@material-ui/core/styles/withStyles";
import axios from 'axios';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});
class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsData: {records: []},
            RememberMe:false
        };
    }
    SignInClick= () => {
        console.log(document.getElementById('username').value)
        axios.post('login', {
            username:document.getElementById('username').value,
            password:document.getElementById('password').value
        })
            .then((res)=>{

                const jwt=res.headers['authorization']
                console.log(jwt);
                let expireTime=86400;
                if (this.state.RememberMe)
                {
                    expireTime=604800;
                }
                console.log(expireTime);
                const jwtExpire = {
                    jwt,
                    expire: new Date().getTime() + expireTime
                };
                localStorage.setItem("jwt", JSON.stringify(jwtExpire))
                localStorage.setItem("userData", JSON.stringify(res.data.data))
                console.log(JSON.parse(localStorage.getItem("userData")).avatar);
                this.props.history.replace('/')


            })
        //console.log(document.getElementById('username').value)
    }
    // usernameChange(event){
    //
    // }
    RememberMeCheck=(event)=>{
        this.setState({RememberMe:event.target.checked})
    }
    render()
    {
        const {classes} = this.props
        return (

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>

                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="UserName"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            //value={"markerhub"}
                            // onChange={this.usernameChange}
                            // ref='username'
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            //value={"111111"}
                            // ref='b'

                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" onChange={this.RememberMeCheck}/>}
                            label="Remember me"
                        />
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.SignInClick}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/SignUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }

}


export default withStyles(useStyles)(SignInPage)

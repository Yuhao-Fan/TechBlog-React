import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SwipeableTemporaryDrawer from "./Drawer";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import SearchBar from "./SearchBar";

const useStyles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },



    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});
class PrimarySearchAppBar extends React.Component{
//export default function PrimarySearchAppBar() {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl:null,
            mobileMoreAnchorEl:null,
        };

    }
    //const classes = useStyles();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


    render() {
        const {anchorEl,mobileMoreAnchorEl }=this.state
        //const mobileMoreAnchorEl=this.state.anchorEl
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const handleProfileMenuOpen = (event) => {
            this.setState({anchorEl:event.currentTarget});
        };
        const LogoutButton = () => {

            this.props.history.push('/SignIn');
            localStorage.clear();

        };

        const handleMobileMenuClose = () => {
            //setMobileMoreAnchorEl(null);
            this.setState({mobileMoreAnchorEl:null});
        };

        const handleMenuClose = () => {

            //setAnchorEl(null);
            this.setState({anchorEl:null});
            handleMobileMenuClose();
        };

        const handleMobileMenuOpen = (event) => {
            // setMobileMoreAnchorEl(event.currentTarget);
            this.setState({mobileMoreAnchorEl:event.currentTarget});
        };

        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}><Button onClick={()=>this.props.history.push('/SignIn')}>登录</Button></MenuItem>
                <MenuItem onClick={handleMenuClose}><Button onClick={()=>this.props.history.push('/SignUp')}>注册</Button></MenuItem>
                <MenuItem onClick={handleMenuClose}><Button onClick={LogoutButton}>登出</Button></MenuItem>
            </Menu>
        );

        const userData = JSON.parse(localStorage.getItem("userData"));
        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >

                        {
                            (userData!=null)?<Avatar alt="Remy Sharp" src={userData.avatar} />
                            :<AccountCircle />
                        }

                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );
        const {classes} = this.props;
        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar >


                        <SwipeableTemporaryDrawer anchor={'left'}/>
                        <Button onClick={() => this.props.history.push('/')}>
                            <Typography className={classes.title} variant="h6" noWrap>
                                TechShare
                            </Typography>
                        </Button>
                        <SearchBar history={ this.props.history }/>

                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit"
                                        onClick={()=>{this.props.history.push('/Info')}}

                            >
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {
                                    (userData!=null)?<Avatar alt="Remy Sharp" src={userData.avatar} />
                                        :<AccountCircle />
                                }
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>
        )
    }
}
export default withStyles(useStyles)(PrimarySearchAppBar)
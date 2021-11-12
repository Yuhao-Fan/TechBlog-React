import React from 'react';

import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import axios from "axios";
import BlogCard from "./HomeBlogCard";
import SearchIcon from "@material-ui/icons/Search";
import {fade} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CustomizedSnackbars from "./SnackBar";
import Container from "@material-ui/core/Container";

const useStyles = theme => ({
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    // typography: {
    //     padding: theme.spacing(2),
    // },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            anchorEl:null,
            Input:"",
            SearchData:[],
        }

    }

    onRef = ref => { this.CustomizedSnackbars = ref }
    render() {
        const {classes} = this.props;
        const setAnchorEl=(value)=>{
            this.setState({anchorEl:value});
        }
        const onChangeInput= (event) => {
            this.setState({Input:event.target.value});



        };

        const handleClose = () => {
            setAnchorEl(null);
        };
        const ClickSearch=()=> {
            console.log(this.state.Input);
            // return <CustomizedSnackbars data={"NOT FOUND!"} type={"error"}/>;
            if (this.state.Input !== "") {
                // ()=>{<CustomizedSnackbars data={"NOT FOUND!"} type={"error"}/>}
                // console.log("空")
                // <CustomizedSnackbars data={"NOT FOUND!"} type={"error"}/>
                // CustomizedSnackbars("NOT FOUND!", "error");
                axios.get(
                    'blog/search?Info=' + this.state.Input,
                )
                    .then((body) => {
                        console.log(body.data)
                        if (body.data.data===[]) {
                            // CustomizedSnackbars("NOT FOUND!", "error");
                            this.CustomizedSnackbars.handleClick("NOT FOUND!","error");
                        }
                        this.CustomizedSnackbars.handleClick("FOUND","success");
                        this.setState({
                            SearchData: body.data.data
                        })
                    }).then(
                    () => {
                        setAnchorEl(true);
                    }
                )
            }
            else this.CustomizedSnackbars.handleClick("Please Input!","error");
                // console.log("shibai")
                // <CustomizedSnackbars data={"NOT FOUND!"} type={"error"}/>
                // CustomizedSnackbars("Please Input!", "error");
        }


        const anchorEl=this.state.anchorEl;
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        let list=this.state.SearchData;
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{'aria-label': 'search'}}
                    onChange={onChangeInput}
                />

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}

                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Container maxWidth="xs">
                        {list.map((post) => (
                            <BlogCard key={post.id} post={post} history={this.props.history} />
                            // history={this.props.history}用于防止找不到props
                        ))}
                        </Container>
                    </Popover>
                <Button onClick={ClickSearch}>Search</Button>
                <CustomizedSnackbars onRef={this.onRef}/>
            </div>
            );
        }
    }
    export default withStyles(useStyles)(SearchBar);

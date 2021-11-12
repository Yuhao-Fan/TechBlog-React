import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {ThumbDownAltRounded, ThumbUpAltRounded} from "@material-ui/icons";
import CollectionsBookmarkRoundedIcon from "@material-ui/icons/CollectionsBookmarkRounded";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";

const useStyles = theme => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    exampleWrapper: {
        position: 'relative',
        marginTop: theme.spacing(3),
        height: 380,
    },
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
});


class SpeedDials extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            expanded:false,
            openCardHeaderMenu:null,
            like:false,
            dislike:false,
            collect:false,
            share:false,
            openSpeedDial:false,
        }
    }

    render() {
        const id =this.props.id
        const {expanded,openCardHeaderMenu,like,dislike,collect,share}=this.state
        const ClickLike=()=>{
            this.setState({like:!like})
            const userJwt = JSON.parse(localStorage.getItem("jwt"));
            console.log(userJwt)
            axios.get(
                'blog/like?isadd=' + !like + '&blogId=' + id,
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
                'blog/dislike?isadd=' + !dislike + '&blogId=' + id,
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
                'blog/collect?isadd=' + !collect + '&blogId=' + id,
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
                'blog/share?isadd=' + !share + '&blogId=' + id,
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
        const actions = [
            { icon: <ShareIcon color={this.state.share?"secondary":"action"} onClick={ClickShare}/>, name: 'Share' },
            { icon: <CollectionsBookmarkRoundedIcon color={this.state.collect?"secondary":"action"} onClick={ClickCollect}/>, name: 'Collect' },
            { disabled:this.state.like,icon: <ThumbDownAltRounded color={this.state.dislike?"secondary":"action"} onClick={ClickDislike}/>, name: 'Dislike' },
            { disabled:this.state.dislike, icon: <ThumbUpAltRounded  color={this.state.like?"secondary":"action"} onClick={ClickLike}/>, name: 'Like' },
        ];
        const {classes} = this.props;






        const handleClose = () => {
            this.setState({openSpeedDial:false});
        };

        const handleOpen = () => {
            this.setState({openSpeedDial:true});
        };

        return (
            <div className={classes.root}>
                {/*<FormControlLabel*/}
                {/*    control={<Switch checked={hidden} onChange={handleHiddenChange} color="primary" />}*/}
                {/*    label="Hidden"*/}
                {/*/>*/}
                {/*<FormLabel className={classes.radioGroup} component="legend">*/}
                {/*    Direction*/}
                {/*</FormLabel>*/}
                {/*<RadioGroup*/}
                {/*    aria-label="direction"*/}
                {/*    name="direction"*/}
                {/*    value={direction}*/}
                {/*    onChange={handleDirectionChange}*/}
                {/*    row*/}
                {/*>*/}
                {/*    <FormControlLabel value="up" control={<Radio />} label="Up" />*/}
                {/*    <FormControlLabel value="right" control={<Radio />} label="Right" />*/}
                {/*    <FormControlLabel value="down" control={<Radio />} label="Down" />*/}
                {/*    <FormControlLabel value="left" control={<Radio />} label="Left" />*/}
                {/*</RadioGroup>*/}
                <div className={classes.exampleWrapper}>
                    <SpeedDial
                        ariaLabel="SpeedDial example"
                        className={classes.speedDial}
                        hidden={false}
                        icon={<SpeedDialIcon/>}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={this.state.openSpeedDial}
                        direction='up'
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                disabled={action.disabled}
                                // onClick={handleClose}
                            />
                        ))}
                    </SpeedDial>
                </div>
            </div>
        );
    }
}
export default withStyles(useStyles)(SpeedDials);

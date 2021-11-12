import { makeStyles } from '@material-ui/core/styles';
const headerStyle = makeStyles((theme) => ({
    link: {
        margin: theme.spacing(1, 1.5),
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },

}));

export default headerStyle;

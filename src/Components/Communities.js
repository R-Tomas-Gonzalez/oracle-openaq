import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 275,
        backgroundColor: "#e5ebf0",
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
    paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    wordWrap: "break-word",
    minHeight: "90%"
    },
}));


const Communities = (props) => {

    const classes = useStyles();

    const community = props.community
    const name = community.name;
    const parameters = community.parameters;

    let lastValue = 0;
    let unit = "";
    let displayName = "";


    for (const param of parameters) {
        if (param.parameterId === 2) {
            lastValue = Math.round(param.lastValue)
            unit = param.unit;
            displayName = param.displayName;
        }
    }


    return (
        <Paper className={classes.paper}>
            <Typography variant="h5">
                Details:
            </Typography>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h6">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1">
                        Measurement:
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {displayName}
                    </Typography>
                    <Typography variant="h4">
                        {lastValue}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {unit}
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    )
}

export default Communities;

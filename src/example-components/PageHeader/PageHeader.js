import {  Card, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root : {
    backgroundColor : '#fdfdff',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    margin: '-2rem -2rem 2rem',
    
  },
  pageHeader : {
    padding : theme.spacing(4),
    display: 'flex',
    marginBottom : theme.spacing(2)
  },
  pageIcon : {
    display : 'inline-block',
    padding: theme.spacing(2),
    color: '#001529'
  },
  pageTitle :{
    paddingLeft : theme.spacing(4),
    '& .MuiTypography-subtitle2':{
      opacity : '0.6'
    }
  }
}))

const PageHeader = (props) => {
  const { title, subTitle, icon } = props;
  const classes = useStyles()
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card elevation={3} className={classes.pageIcon}>
          {icon}
        </Card>
        <div className={classes.pageTitle}>
          <Typography variant="h3" component ="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component ="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default PageHeader;

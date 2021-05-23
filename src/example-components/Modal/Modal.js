import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  makeStyles, Dialog, DialogTitle as MuiDialogTitle, DialogContent as MuiDialogContent, DialogActions as MuiDialogActions, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const styles = makeStyles(theme => ({
  root: {
    '& .MuiDialogTitle-root' : {
      backgroundColor: '#6495ed'
    },
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(0),
    color: '#fff',
  },
  text:{
    color: '#fff'
  }
}));

const DialogTitle =((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle styles={{backgroundColor:'6495ed'}} disableTypography className={classes.root} {...other}>
      <Typography className={classes.text} variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const Modal = (props) => {
  const classes = styles();
  const { children, title, isVisible, setIsVisible } = props;
  return (
    <div>
      <Dialog className={classes.root} maxWidth="sm" onClose={() => setIsVisible(false)} aria-labelledby="customized-dialog-title" open={isVisible}>
        <DialogTitle  classes={classes}  id="customized-dialog-title" onClose={() => setIsVisible(false)}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Controls from '../../controls/Controls';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  FormControlLabel,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Button,
  List,
  ListItem,
  TextField,
  FormControl,
  ListItemText,
  Grid,
  makeStyles
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';

import DialogContentText from '@material-ui/core/DialogContentText';

const emails = ['example1@example.com', 'example2@example.com'];

const useStyles =makeStyles(theme => ({
  boton: {
    margin: theme.spacing(1),
    textTransform: 'none'
  },
  paper: {
    maxWidth: 1020,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  label:{
    color: '#353c4e',
    marginBottom: '5px',
    fontSize: '13px',
    paddingLeft:'5px'
  },
  divider:{
    borderLeft: '2px solid #e0e0e0'
  },
  title:{
    margin: '16px',
    marginBottom: '15px',
    paddingBottom: '5px',
    borderBottom: '1px solid #e0e0e0',
    color: '#353c4e',
    textTransform: 'uppercase',
    letterSpacing: '5px'
  },
  left:{
    width:'100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop:'20%',
    marginLeft:'5%'
   
  },
  img:{
    width: '130px',
    height: '160px',
    marginBottom: '10px',
    boxShadow: '0 2px 20px 0 rgba(39, 52, 58, 0.08)',
    cursor: 'pointer'
  }
}));

function SimpleDialog(props) {
  const classes = useStyles()
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {emails.map(email => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}>
            <ListItemAvatar>
              <Avatar className="bg-first">
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default function LivePreviewExample() {
  // Example 1
  const classes=useStyles()

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  // Example 2

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  // Example 3

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [checked1, setChecked1] = React.useState(true);

  const handleChange1 = event => {
    setChecked1(event.target.checked);
  };

  // Example 4

  const [open3, setOpen3] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen3 = scrollType => () => {
    setOpen3(true);
    setScroll(scrollType);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open3) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open3]);

  return (
    <Fragment>
      <Button
        className="m-2"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />

      <Button
        className="m-2"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen1}>
        Open form dialog
      </Button>
      <Dialog
        maxWidth="sm"
        open={open1}
        onClose={handleClose1}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Usuario</DialogTitle>
        <DialogContent>
        <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Nombre:</h4>
                <Controls.Input 
                  fullWidth
                  size="small"
                  placeholder="Introduzca nombre"
                  /*name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  error={errors.name}*/
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Apellidos:</h4>
                <Controls.Input 
                  fullWidth
                  placeholder="Introduzca apellidos"
                  size="small"
                  /*name="lastname"
                  value={values.lastname}
                  onChange={handleInputChange}
                  error={errors.lastname}*/
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Correo Electronico:</h4>
                <Controls.Input 
                  fullWidth
                  placeholder="Introduzca correo electronico"
                  size="small"
                  /*name="email"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}*/
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <h4 className={classes.label}>Rol de usuario:</h4>
                <Controls.Input 
                  fullWidth
                  size="small"
                  placeholder="Introduzca Rol de usuario"
                  /*name="role"
                  value={values.role}
                  onChange={handleInputChange}
                  error={errors.role}*/
                />
              </Grid>
              
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose1} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        className="m-2"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen2}>
        Open login form
      </Button>
      <Dialog
        open={open2}
        maxWidth="lg"
        onClose={handleClose2}
        aria-labelledby="form-dialog-title2">
        <DialogContent className="p-0">
          <div>
            <div className="bg-secondary border-0">
              <div className="card-header d-block bg-white pt-4 pb-5">
                <div className="text-muted text-center mb-3">
                  <span>Sign in with</span>
                </div>
                <div className="text-center">
                  <Button variant="outlined" className="mr-2 text-facebook">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fab', 'facebook']} />
                    </span>
                    <span className="btn-wrapper--label">Facebook</span>
                  </Button>
                  <Button variant="outlined" className="ml-2 text-twitter">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fab', 'twitter']} />
                    </span>
                    <span className="btn-wrapper--label">Twitter</span>
                  </Button>
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <span>Or sign in with credentials</span>
                </div>
                <form>
                  <div className="form-group mb-3">
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">
                        <div>
                          <FontAwesomeIcon icon={['far', 'envelope']} />
                        </div>
                      </div>
                      <TextField fullWidth placeholder="Email" type="email" />
                    </div>
                  </div>
                  <FormControl>
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">
                        <div>
                          <FontAwesomeIcon icon={['fas', 'unlock-alt']} />
                        </div>
                      </div>
                      <TextField
                        fullWidth
                        placeholder="Password"
                        type="password"
                      />
                    </div>
                  </FormControl>
                  <div className="w-100">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked1}
                          onChange={handleChange1}
                          value="checked1"
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleClose2}
                      className="mt-4">
                      Sign in
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button
        className="m-2"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen3('paper')}>
        Inner scroll
      </Button>
      <Button
        className="m-2"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen3('body')}>
        Body scroll
      </Button>
      <Dialog
        open={open3}
        onClose={handleClose3}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}>
            {[...new Array(50)]
              .map(
                () =>
                  'Cras mattis consectetur purus sit amet fermentum.\n' +
                  'Cras justo odio, dapibus ac facilisis in, egestas eget quam.\n' +
                  'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.' +
                  'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.'
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose3} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

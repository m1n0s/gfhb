import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReactMarkdown from 'react-markdown';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BookIcon from '@material-ui/icons/Book';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import {
  selectPickedUser,
  selectPickedRepo,
  selectPickedIssue,
  postIssueComment,
  getIssueComments,
  getRepoIssues,
} from '../../store/githubSlice';

import './styles.css';

export default function SendCommentModal({ selectedText, selectedGif }) {
  const dispatch = useDispatch();

  const [dialogOpened, setDialogOpened] = useState(Boolean(selectedGif));
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [postCommentInProgress, setPostCommentInProgress] = useState(false);

  const pickedUser = useSelector(selectPickedUser);
  const pickedRepo = useSelector(selectPickedRepo);
  const pickedIssue = useSelector(selectPickedIssue);

  useEffect(() => {
    setDialogOpened(Boolean(selectedGif));
  }, [selectedGif]);

  if (!selectedGif) {
    return null;
  }

  const handleDialogClose = () => {
    setDialogOpened(false);
  };

  const showToast = (type, message) => {
    setSnackbarVisible(true);
    setToastType(type);
    setToastMessage(message);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarVisible(false);
  };

  const handleSend = async () => {
    try {
      setPostCommentInProgress(true);

      const { html_url } = await dispatch(
        postIssueComment(pickedIssue, commentMarkdown)
      );

      handleDialogClose();

      showToast(
        'success',
        <div>
          Comment posted successfully.&nbsp;
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            Verify.
          </a>
        </div>
      );

      dispatch(getRepoIssues(pickedRepo, true));
      dispatch(getIssueComments(pickedIssue, true));
    } catch (message) {
      showToast('error', message);
    } finally {
      // Stupid hack I hate to have but it's a quick win to allow Dialog hide before loader disappears and show old content
      setTimeout(() => setPostCommentInProgress(false), 100);
    }
  };

  const commentMarkdown = `> ${selectedText}
  
  ![${selectedGif.title}](${selectedGif.images.fixed_height.url})
  `;

  return (
    <>
      <Dialog open={dialogOpened} hideBackdrop fullWidth>
        <DialogTitle className="dialog-title">
          <Typography className="dialog-title-text" variant="h6">
            Comment summary
          </Typography>
          <IconButton
            disabled={postCommentInProgress}
            className="close-icon"
            aria-label="close"
            onClick={handleDialogClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {postCommentInProgress ? (
            <div className="loading-wrapper">
              <CircularProgress />
            </div>
          ) : (
            <Grid container>
              <Grid item xs={4}>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={pickedUser.login} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BookIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={pickedRepo.name} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ErrorOutlineIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={pickedIssue.title} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={8}>
                <ReactMarkdown className="comment-preview">
                  {commentMarkdown}
                </ReactMarkdown>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disableFocusRipple
            color="default"
            variant="contained"
            onClick={handleDialogClose}
            disabled={postCommentInProgress}
          >
            Close
          </Button>
          <Button
            disableFocusRipple
            autoFocus
            color="primary"
            variant="contained"
            onClick={handleSend}
            disabled={postCommentInProgress}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarVisible}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={toastType}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

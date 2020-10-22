import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import {
  selectIssues,
  selectIssuesLoading,
  pickIssue,
  getIssueComments,
} from '../../store/githubSlice';

import IssueItem from './components/IssueItem';

import './styles.css';

export default function GithubIssuesList() {
  const dispatch = useDispatch();

  const loading = useSelector(selectIssuesLoading);
  const issues = useSelector(selectIssues);

  const handleIssueClick = (issue) => {
    dispatch(pickIssue(issue));
    dispatch(getIssueComments(issue));
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (!issues.length) {
    return (
      <Alert variant="filled" severity="info">
        Please choose github user and repository with some issues in order to
        see them
      </Alert>
    );
  }

  return (
    <>
      <h3 className="issues-list-header">Issues:</h3>
      <List>
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} onClick={handleIssueClick} />
        ))}
      </List>
    </>
  );
}

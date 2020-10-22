import React from 'react';
import { useSelector } from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';

import {
  selectCommentsLoading,
  selectComments,
  selectPickedIssue,
} from '../../store/githubSlice';

import CommentItem from './components/CommentItem';

import './styles.css';

export default function GithubIssue() {
  const issue = useSelector(selectPickedIssue);
  const loading = useSelector(selectCommentsLoading);
  const comments = useSelector(selectComments);

  if (!issue) {
    return null;
  }

  return (
    <div>
      <CommentItem item={issue} />
      {loading ? (
        <LinearProgress />
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} item={comment} />
        ))
      )}
    </div>
  );
}

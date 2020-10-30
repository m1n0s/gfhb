import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import MessageIcon from '@material-ui/icons/Message';

export default function IssueItem({ issue, onClick }) {
  const { title, comments } = issue;

  const handleClick = () => {
    onClick(issue);
  };

  // +1 for issue body
  const commentsCount = comments + 1;

  return (
    <ListItem onClick={handleClick} button>
      <ListItemIcon className="issue-item-icon-wrapper">
        <Badge badgeContent={commentsCount} color="primary">
          <MessageIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  );
}

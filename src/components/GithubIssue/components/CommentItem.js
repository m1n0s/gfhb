import React from 'react';
import ReactMarkdown from 'react-markdown';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

export default function CommentItem({
  item: { user, created_at: createdAt, body },
}) {
  const date = new Date(createdAt).toDateString();

  return (
    <Card className="comment">
      <CardHeader
        className="comment-header"
        avatar={<Avatar src={user.avatar_url} />}
        title={user.login}
        subheader={date}
      />
      <CardContent className="comment-content">
        <ReactMarkdown>{body}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}

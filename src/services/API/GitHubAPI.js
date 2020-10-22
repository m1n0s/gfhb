import axios from 'axios';

class GitHubAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
      },
    });
  }

  findUsers(q) {
    return this.axios.get('/search/users', {
      params: {
        q,
        per_page: 15,
      },
    });
  }

  readUserRepos(user) {
    return this.axios.get(user.repos_url);
  }

  readRepoIssues(repo) {
    const issuesUrl = repo.issues_url.replace('{/number}', '');

    return this.axios.get(issuesUrl, {
      params: {
        per_page: 10,
      },
    });
  }

  readIssueComments(issue) {
    return this.axios.get(issue.comments_url, {
      params: {
        per_page: 30,
      },
    });
  }

  postIssueComment(issue, body) {
    return this.axios.post(issue.comments_url, { body });
  }
}

export default new GitHubAPI();

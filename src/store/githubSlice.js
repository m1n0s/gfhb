import { createSlice } from '@reduxjs/toolkit';

import GitHubAPI from '../services/API/GitHubAPI';

/* TODO items
 *  1. Normalize store to be ready to work with infinite scroll (pagination).
 *  2. Decouple store entities into separate stores (e.g. for Users, Repos, Issues etc).
 * */
export const githubSlice = createSlice({
  name: 'github',
  initialState: {
    usersLoading: false,
    reposLoading: false,
    issuesLoading: false,
    commentsLoading: false,

    users: [],
    pickedUser: null,

    repos: [],
    pickedRepo: null,

    issues: [],
    pickedIssue: null,

    comments: [],
  },
  reducers: {
    setUsersLoading: (state, action) => {
      state.usersLoading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    pickUser: (state, action) => {
      state.pickedUser = action.payload;
      state.repos = [];
      state.issues = [];
      state.comments = [];

      state.pickedRepo = null;
      state.pickedIssue = null;
    },

    setReposLoading: (state, action) => {
      state.reposLoading = action.payload;
    },
    setRepos: (state, action) => {
      state.repos = action.payload;
    },
    pickRepo: (state, action) => {
      state.pickedRepo = action.payload;
      state.issues = [];
      state.comments = [];

      state.pickedIssue = null;
    },

    setIssuesLoading: (state, action) => {
      state.issuesLoading = action.payload;
    },
    setIssues: (state, action) => {
      state.issues = action.payload;
    },
    pickIssue: (state, action) => {
      state.pickedIssue = action.payload;
      state.comments = [];
    },

    setCommentsLoading: (state, action) => {
      state.commentsLoading = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      const issue = state.issues.find(({ id }) => id === state.pickedIssue?.id);

      issue.comments += 1;

      state.comments.push(action.payload);
    },
  },
});

/* Sync actions */
export const {
  setUsersLoading,
  setUsers,
  pickUser,
  setReposLoading,
  setRepos,
  pickRepo,
  setIssuesLoading,
  setIssues,
  pickIssue,
  setCommentsLoading,
  setComments,
  addComment,
} = githubSlice.actions;

/* Async actions */
export const findUsers = (term) => async (dispatch) => {
  try {
    if (!term) {
      return dispatch(setUsers([]));
    }

    dispatch(setUsersLoading(true));
    dispatch(setUsers([]));

    const {
      data: { items: users },
    } = await GitHubAPI.findUsers(term);

    dispatch(setUsers(users));
  } catch (error) {
    // TODO dispatch error for UI
    dispatch(setUsers([]));
  } finally {
    dispatch(setUsersLoading(false));
  }
};

export const getUserRepos = (user) => async (dispatch) => {
  try {
    dispatch(setReposLoading(true));
    dispatch(setRepos([]));

    const { data: repos } = await GitHubAPI.readUserRepos(user);

    dispatch(setRepos(repos));
  } catch (error) {
    // TODO dispatch error for UI
    dispatch(setRepos([]));
  } finally {
    dispatch(setReposLoading(false));
  }
};

export const getRepoIssues = (repo, silent = false) => async (dispatch) => {
  try {
    if (!silent) {
      dispatch(setIssuesLoading(true));
      dispatch(setIssues([]));
    }

    const { data: issues } = await GitHubAPI.readRepoIssues(repo, silent);

    dispatch(setIssues(issues));
  } catch (error) {
    // TODO dispatch error for UI
    dispatch(setIssues([]));
  } finally {
    if (!silent) {
      dispatch(setIssuesLoading(false));
    }
  }
};

export const getIssueComments = (issue, silent = false) => async (dispatch) => {
  try {
    if (!silent) {
      dispatch(setCommentsLoading(true));
      dispatch(setComments([]));
    }

    const { data: comments } = await GitHubAPI.readIssueComments(issue, silent);

    dispatch(setComments(comments));
  } catch (error) {
    // TODO dispatch error for UI
    dispatch(setIssues([]));
  } finally {
    if (!silent) {
      dispatch(setCommentsLoading(false));
    }
  }
};

export const postIssueComment = (issue, commentBody) => async (dispatch) => {
  try {
    const { data } = await GitHubAPI.postIssueComment(issue, commentBody);

    dispatch(addComment(data));

    return data;
  } catch (error) {
    // TODO create general error handler which can transform errors to corresponding human readable messages
    // eslint-disable-next-line no-throw-literal
    throw 'Something went wrong. Please try again later.';
  }
};

/* Selectors */
export const selectUsers = (state) => state.github.users;
export const selectRepos = (state) => state.github.repos;
export const selectIssues = (state) => state.github.issues;
export const selectComments = (state) => state.github.comments;

export const selectUsersLoading = (state) => state.github.usersLoading;
export const selectReposLoading = (state) => state.github.reposLoading;
export const selectIssuesLoading = (state) => state.github.issuesLoading;
export const selectCommentsLoading = (state) => state.github.commentsLoading;

export const selectPickedUser = (state) => state.github.pickedUser;
export const selectPickedRepo = (state) => state.github.pickedRepo;
export const selectPickedIssue = (state) => state.github.pickedIssue;

export default githubSlice.reducer;

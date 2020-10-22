import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

import {
  findUsers,
  pickUser,
  getUserRepos,
  selectUsers,
  selectUsersLoading,
  selectReposLoading,
  selectRepos,
  pickRepo,
  getRepoIssues,
} from '../../store/githubSlice';

import UsersAutocomplete from './components/UsersAutocomplete';
import UserReposAutocomplete from './components/UserReposAutocomplete';

import './style.css';

export default function GithubIssuesFinder() {
  const dispatch = useDispatch();

  // just for ability to clean repo on user change
  const [repo, setRepo] = useState(null);

  const usersLoading = useSelector(selectUsersLoading);
  const users = useSelector(selectUsers);

  const reposLoading = useSelector(selectReposLoading);
  const repos = useSelector(selectRepos);

  const debouncedUserSearch = useDebouncedCallback((term) => {
    dispatch(findUsers(term));
  }, 300);

  const handleUserChange = useCallback(
    (selectedUser) => {
      if (repo) {
        setRepo(null);
      }

      dispatch(pickUser(selectedUser));

      if (selectedUser) {
        dispatch(getUserRepos(selectedUser));
      }
    },
    [dispatch, repo]
  );

  const handleRepoChange = useCallback(
    (selectedRepo) => {
      setRepo(selectedRepo);
      dispatch(pickRepo(selectedRepo));

      if (selectedRepo) {
        dispatch(getRepoIssues(selectedRepo));
      }
    },
    [dispatch]
  );

  return (
    <form className="users-repos-row">
      <UsersAutocomplete
        loading={usersLoading}
        options={users}
        onChange={handleUserChange}
        onSearch={debouncedUserSearch.callback.bind(debouncedUserSearch)}
      />

      <UserReposAutocomplete
        disabled={reposLoading || !repos.length}
        options={repos}
        value={repo}
        onChange={handleRepoChange}
      />
    </form>
  );
}

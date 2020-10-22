import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { findGifs } from '../../store/giphySlice';
import { selectPickedIssue } from '../../store/githubSlice';

import GithubIssuesFinder from '../GithubIssuesFinder/GithubIssuesFinder';
import GithubIssuesList from '../GithubIssuesList/GithubIssuesList';
import GithubIssue from '../GithubIssue/GithubIssue';
import GiphyGifsList from '../GiphyGifsList/GiphyGifsList';
import SendCommentModal from '../SendCommentModal/SendCommentModal';

import './styles.css';

function App() {
  const dispatch = useDispatch();
  const [selectedText, setSelectedText] = useState('');
  const [selectedGif, setSelectedGif] = useState(null);

  const pickedIssue = useSelector(selectPickedIssue);

  useEffect(() => {
    function handler() {
      if (!pickedIssue) {
        return;
      }

      const selectedText = document.getSelection().toString();

      if (selectedText) {
        setSelectedText(selectedText);
        setSelectedGif(null);
        dispatch(findGifs(selectedText));
      }
    }

    const debounced = debounce(handler, 300);

    document.addEventListener('selectionchange', debounced);

    return () => document.removeEventListener('selectionchange', debounced);
  }, [dispatch, pickedIssue]);

  return (
    <div className="app">
      <header className="app-header">GifHub</header>
      <main className="app-main">
        <GithubIssuesFinder />
        <GithubIssuesList />
        <GithubIssue />
      </main>

      <GiphyGifsList selectedText={selectedText} onGifClick={setSelectedGif} />

      <SendCommentModal selectedText={selectedText} selectedGif={selectedGif} />
    </div>
  );
}

export default App;

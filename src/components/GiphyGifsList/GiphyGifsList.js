import React from 'react';
import { useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import { selectGifs, selectGifsLoading } from '../../store/giphySlice';

import './style.css';

export default function GiphyGifsList({ selectedText, onGifClick }) {
  const loading = useSelector(selectGifsLoading);
  const gifs = useSelector(selectGifs);

  return (
    <aside className={`gifs ${gifs.length ? 'active' : ''}`}>
      <h4 className="gifs-header">
        Top {gifs.length} Giphy gifs for string: "{selectedText}"
      </h4>
      <ul className="gifs-list">
        {loading ? (
          <CircularProgress />
        ) : (
          gifs.map((gif) => (
            <li key={gif.id}>
              <img
                onClick={() => onGifClick(gif)}
                alt={gif.title}
                width={170}
                key={gif.id}
                src={gif.images.preview_gif.url}
              />
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}

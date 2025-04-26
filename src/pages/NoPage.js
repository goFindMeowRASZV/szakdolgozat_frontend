import React from 'react';
import styles from '../Fonts.module.css';

function NoPage() {
  return (
    <div className="no-page-container">
      <div className="no-page-panel">
        <h1 className="no-page-text">No Page</h1>
        <img
          src='/images/420.gif'
          alt="No page"
          className="no-page-image"
        />
      </div>
    </div>
  );
}

export default NoPage;
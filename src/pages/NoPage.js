import React from 'react';
import styles from '../Fonts.module.css';

function NoPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <img 
        src={`${process.env.PUBLIC_URL}/images/420.gif`} 
        alt="No page" 
        style={{
          maxWidth: '100%',
          height: 'auto'
        }} 
      />
      <h1 style={{ marginTop: '5px', color: 'white', marginRight:'40px', fontSize:'100px' }}>No Page</h1>
    </div>
  );
}

export default NoPage;

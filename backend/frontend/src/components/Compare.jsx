import React from 'react';

const Compare = ({ text1, text2 }) => {
  const words1 = text1.split(' ');
  const words2 = text2.split(' ');

  const diff = words1.map((word, i) => {
    if (word !== words2[i]) {
      return <span key={i} style={{ backgroundColor: 'yellow' }}>{word} </span>;
    } else {
      return <span key={i}>{word} </span>;
    }
  });

  return <div>{diff}</div>;
};

export default Compare;
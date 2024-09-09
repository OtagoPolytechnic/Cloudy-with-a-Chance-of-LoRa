import React from 'react';

const Widget = ({ name, data }) => {
    return (
      <div className="widget">
        <h2>{name}</h2>
          <p>{data}</p>
      </ div>
    )
  }
  export default Widget;
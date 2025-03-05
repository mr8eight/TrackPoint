import React from 'react';
import { Link } from 'react-router-dom';

const Page3 = () => {
  return (
    <div>
      <h1>Page 3</h1>
      <button><Link to="/page1">Go to Page 1</Link></button>
      <button><Link to="/page2">Go to Page 2</Link></button>
    </div>
  );
};

export default Page3;
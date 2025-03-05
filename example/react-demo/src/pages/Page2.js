import React from 'react';
import { Link } from 'react-router-dom';

const Page2 = () => {
  return (
    <div>
      <h1>Page 2</h1>
      <button><Link to="/page1">Go to Page 1</Link></button>
      <button><Link to="/page3">Go to Page 3</Link></button>
    </div>
  );
};

export default Page2;
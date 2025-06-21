import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
    <Link to="/" style={{ margin: '0 10px' }}>Upload</Link>
    <Link to="/history">History</Link>
  </nav>
);

export default Navbar;

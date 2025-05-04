import React from 'react';

function Sidebar() {
  return (
    <div className="bg-light p-3" style={{ height: '100vh' }}>
      <h4>Menu</h4>
      <ul className="list-unstyled">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/feed">Feed</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;

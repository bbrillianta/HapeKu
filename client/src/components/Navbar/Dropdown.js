import React, { useEffect, useState } from 'react';
import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';

function Dropdown({ menuItems }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <a
                className={item.cName}
                onClick={() => setClick(false)}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
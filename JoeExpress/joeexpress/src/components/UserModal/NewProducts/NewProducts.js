import React, { useState } from 'react';
import { TiStarburst } from "react-icons/ti";
import { TbOvalVerticalFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import image from '../../image/caramel.png'
import './NewProducts.css';

function NewProducts() {
  const [position, setPosition] = useState({ x: 30, y: 450 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isClick, setIsClick] = useState(true);
  const navigate = useNavigate();

  const margin = 30; 
  const divWidth = 350;
  const divHeight = 200; 

  const handleMouseDown = (e) => {
    setDragging(true);
    setIsClick(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleNavigate = () => {
    navigate('/menu')
  }
  const handleNavigates = (hash) => {
    setActiveLink(hash);
    // Assuming that handleNavigate changes the URL hash
    window.location.hash = hash;
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setIsClick(false);
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let newX =
        position.x < windowWidth / 2
          ? margin
          : windowWidth - divWidth - margin;

      let newY =
        position.y < windowHeight / 2
          ? margin
          : Math.min(windowHeight - divHeight - margin, position.y);

      setPosition({ x: newX, y: newY });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
  style={{
    position: 'fixed',
    top: position.y,
    left: position.x,
    width: `${divWidth}px`,
    height: `${divHeight}px`,
    backgroundColor: '#e3ded6',
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 1000,
    borderRadius: '20px',
    border: '2px solid #067741',
    boxShadow: '5px 10px 18px #888888',
  }}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={(e) => {
    if (!dragging) return; // Only snap if dragging is active
    handleMouseUp();
  }}
  onMouseLeave={handleMouseUp}
  onClick={handleNavigate}
>
    <div className="absolute -top-10 -left-10 hover:rotate-45 transition-transform duration-300">
      <div className="relative">
        <TiStarburst className="w-28 h-28 text-greenColor drop-shadow-xl" />
        <h1 className="absolute inset-0 flex items-center justify-center font-bold text-xl -rotate-45">
          NEW!
        </h1>
      </div>
      
    </div>

    <div className="absolute top-14 right-4 z-10 ">
      <h1 className="flex flex-col items-center text-right justify-center font-bold text-white text-lg drop-shadow-xl">
        <span className='text-7xl mb-2'>₱ 199</span>
        only!
      </h1>
    </div>

    <div className='absolute -bottom-5 z-[99] font-baloo bg-white rounded-full p-2 max-h-16 overflow-clip text-center'>
      <span className='text-greenColor font-bold text-2xl'>Caramel Macchiato</span>
    </div>

    <div
      className="flex items-center justify-center rotate-[25deg] z-20 -ml-32"
      style={{ pointerEvents: 'none' }} 
    >
      <img
        src={image}
        alt="Product"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: '10px',
        }}
      />
    </div>
  
    {/* Close Button */}
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent the click event from affecting parent handlers
        handleClose(); // Trigger the close functionality
      }}
      style={{
        position: 'absolute',
        top: 5,
        right: 10,
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      &#10005;
    </button>
  </div>
  
  );
}

export default NewProducts;

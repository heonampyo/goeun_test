"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside 
      className={`bg-blue-600 text-white transition-all duration-300 ease-in-out flex-shrink-0 relative`}
      style={{ width: isCollapsed ? '60px' : '250px' }}
    >
      <button 
        onClick={toggleSidebar} 
        className="absolute top-2 right-2 bg-none border-none text-white cursor-pointer text-2xl z-10"
        style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        ▶
      </button>
      <div className={isCollapsed ? 'hidden' : 'p-5'}>
        <h2 className="text-center text-xl font-bold mb-5">요건</h2>
        <ul className="space-y-2">
          <li><Link href="/3-1" className="block p-2 hover:bg-blue-700 rounded">3-1</Link></li>
          <li><Link href="/3-1-1" className="block p-2 hover:bg-blue-700 rounded">3-1-1</Link></li>
          <li><Link href="/3-3" className="block p-2 hover:bg-blue-700 rounded">3-3</Link></li>
          <li><Link href="/3-5" className="block p-2 hover:bg-blue-700 rounded">3-5</Link></li>
          <li><Link href="/3-7" className="block p-2 hover:bg-blue-700 rounded">3-7</Link></li>
          <li><Link href="/completed-docs" className="block p-2 hover:bg-blue-700 rounded">완료문서함</Link></li>
        </ul>
      </div>
    </aside>
  );
}

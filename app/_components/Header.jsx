import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

function Header() {
  return (
    <div className='px-5'>
      <nav className="z-10 w-full">
        <div>
          <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
            <input aria-hidden="true" type="checkbox" name="toggle_nav" id="toggle_nav" className="hidden peer"/>
            <div className="relative z-20 w-full flex justify-between lg:w-max md:px-0">
              <Logo />
              <div className="relative flex items-center lg:hidden max-h-10">
                <label role="button" htmlFor="toggle_nav" aria-label="hamburger" className="relative p-6 -mr-6">
                  <div aria-hidden="true" className="m-auto h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                  <div aria-hidden="true" className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                </label>
              </div>
            </div>
            <div aria-hidden="true" className="fixed z-10 inset-0 h-screen w-screen bg-white/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden dark:bg-gray-900/70"></div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

"use client";

import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const [isUserLoggedIn, setIsLoggedIn] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [providers, setProviders] = useState(null);

  const dropdownClasses = toggleDropdown
    ? "mr-2 mt-2 hover:text-neutral-400 rotate-180 transition"
    : "mr-2 mt-2 hover:text-neutral-400 transition";

  useEffect(() => {
    const setProvider = async () => {
      const response = getProviders();

      setProviders(response);
    };
    setProvider();
  }, [setProviders]);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Searchingo</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type='button'
                  key={provider?.name}
                  onClick={() => signIn(provider?.id)}
                  className='black_btn'
                >
                  Sign In
                </button>;
              })}
          </>
        ) : (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Prompt
            </Link>

            <button
              type='button'
              onClick={() => signOut()}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src='/images/logo.svg'
                width={37}
                height={37}
                alt='profile-image'
                className='rounded-full'
              ></Image>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {!isUserLoggedIn ? (
          <div
            onClick={() => {
              setToggleDropdown((prev) => !prev);
            }}
            className='flex'
          >
            <IoIosArrowDown size={25} className={dropdownClasses} />
            <Image
              src='/images/logo.svg'
              width={37}
              height={37}
              alt='profile-image'
              className='rounded-full'
            ></Image>
            {toggleDropdown && (
              <div className='dropdown '>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className='black_btn w-full mt-5'
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type='button'
                  key={provider?.name}
                  onClick={() => signIn(provider?.id)}
                  className='black_btn'
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

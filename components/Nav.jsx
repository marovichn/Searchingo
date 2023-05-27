"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);


 const dropdownClasses = toggleDropdown
   ? "mr-2 mt-2 hover:text-neutral-400 rotate-180 transition"
   : "mr-2 mt-2 hover:text-neutral-400 transition";

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
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='black_btn'
                  >
                    Sign in with {provider.name}{" "}
                    {provider.name === "Google" ? (
                      <div className='bg-white rounded-full ml-2 -mr-3 p-0.5'>
                        <AiOutlineGoogle className='text-black' />
                      </div>
                    ) : (
                      ""
                    )}
                    {provider.name === "Github" ? (
                      <div className='bg-white rounded-full ml-2 -mr-3 p-0.5'>
                        <AiOutlineGithub className='text-black' />
                      </div>
                    ) : (
                      ""
                    )}
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex' onClick={() => setToggleDropdown(!toggleDropdown)}>
            <IoIosArrowDown size={25} className={dropdownClasses} />
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              
            />

            {toggleDropdown && (
              <div className='dropdown'>
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
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in 
                  {" "}
                  {provider.name === "Google" ? (
                    <div className='bg-white rounded-full ml-2 -mr-3 p-0.5'>
                      <AiOutlineGoogle className='text-black' />
                    </div>
                  ) : (
                    ""
                  )}
                  {provider.name === "Github" ? (
                    <div className='bg-white rounded-full ml-2 -mr-3 p-0.5'>
                      <AiOutlineGithub className='text-black' />
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

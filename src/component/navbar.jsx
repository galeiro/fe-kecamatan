/* eslint-disable eqeqeq */
import {
  ArrowDown2,
  ArrowUp2,
  Book,
  BookSquare,
  Bookmark,
  Buildings2,
  CloseCircle,
  DocumentText,
  HambergerMenu,
  Image,
  More2,
  SearchNormal,
  Timer,
} from 'iconsax-react';
import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import Logo from '../assets/logo/Logo.png';
import { Menu, Transition } from '@headlessui/react';
import Search from './search';
import { BurgerClose as Burger } from 'react-burger-icons';

export default function Navbar() {
  const location = useLocation();
  // console.log(location.pathname);
  const activePage =
    'bg-white px-5 py-2 rounded-lg text-[#3C903C] font-bold transition-all';
  const normalPages = 'transition-all px-5';
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  React.useEffect(() => {
    setNavbarOpen(false);
  }, [location.pathname]);

  const slug = useParams();
  const [open, setOpen] = React.useState(false);
  const cancelButtonRef = React.useRef(null);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [isVisible, setIsVisible] = React.useState(true);
  React.useEffect(() => {
    let prevScrollPosition = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setIsVisible(prevScrollPosition > currentScrollPosition);
      prevScrollPosition = currentScrollPosition;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <div
        className={`fixed w-screen z-20 navbar ${isVisible ? 'visible' : ''}`}
      >
        {/* Dekstop */}
        <div className="lg:flex hidden bg-[#007100] h-6"></div>
        <div className="w-full h-20 lg:bg-[#007100] bg-[#007100]   lg:bg-opacity-20 lg:backdrop-blur-lg lg:drop-shadow-lg flex items-center justify-between px-5 2xl:px-16 lg:px-10">
          <NavLink to={'/'} className={''}>
            <img src={Logo} className="lg:w-[70%] w-[80%] m-0" alt="" />
          </NavLink>
          <div className="flex lg:hidden items-center justify-center gap-x-5">
            <SearchNormal
              onClick={() => {
                setOpen(true);
              }}
              className="w-5 h-5 xl:hidden lg:hidden text-white"
            />
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="xl:hidden lg:hidden h-8 w-8"
            >
              {/* {navbarOpen ? (
                <CloseCircle
                  className="h-8 w-8 xl:hidden lg:hidden transition-all"
                  color="#ffffff"
                />
              ) : (
                <HambergerMenu
                  className="h-8 w-8 xl:hidden lg:hidden transition-all"
                  color="#ffffff"
                />
              )} */}
              <Burger isClosed={navbarOpen} />
            </button>
          </div>

          <nav className="lg:flex hidden space-x-6 items-center font-bold">
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive ? activePage : normalPages
              }
            >
              Home
            </NavLink>
            <div>
              <DropProfile location={location.pathname} />
            </div>
            <NavLink>
              <DropProgram location={location.pathname} />
            </NavLink>
            <div className="w-1/4 text-center flex items-center justify-center my-auto">
              <DropMedia location={location.pathname} slug={slug} />
            </div>
            <NavLink
              to={'/aplikasi'}
              className={({ isActive }) =>
                isActive ? activePage : normalPages
              }
            >
              Aplikasi
            </NavLink>
          </nav>
          <div
            onClick={() => setOpen(true)}
            className="lg:flex cursor-pointer justify-between hidden gap-x-[15px] lg:w-[20%] text-sm items-center px-5  py-3 rounded-lg bg-white"
          >
            <div className="flex gap-x-3">
              <SearchNormal className="w-5 h-5" />
              <span className='italic'>Cari Berita...</span>
            </div>
            <div className='flex items-center space-x-1'>
              <p className='font-bold text-white rounded bg-hijauPrimary py-1 w-[35px] text-center'>Ctrl</p>
              <p className='font-bold text-white rounded bg-hijauPrimary py-1 w-[35px] text-center'>K</p>
            </div>
          </div>
        </div>
        {/* Dekstop */}
        {/* Mobile */}
        <div
          className={`${
            navbarOpen ? '  translate-y-[78px]' : '-translate-y-[1000px] '
          } top-0 fixed flex-col lg:hidden flex -z-10 bg-[#007100] w-full transition-[0.3s]
             px-10 py-10 pb-10 overflow-y-auto rounded-b-2xl  `}
        >
          <ul className="flex flex-col gap-y-5 font-bold text-white">
            <NavLink to={'/'}>
              <li className="cursor-pointer">Home</li>
            </NavLink>
            <li className="cursor-pointer flex items-center gap-x-5">
              <DropProfileMobile />
            </li>
            <li className="cursor-pointer flex items-center gap-x-5">
              <DropProgramMobile />
            </li>
            <li className="cursor-pointer flex items-center gap-x-5">
              <DropMobileMedia />
            </li>
            <NavLink to={'/aplikasi'}>
              <li className="cursor-pointer">Aplikasi</li>
            </NavLink>
          </ul>
        </div>
        {/* Mobile */}
      </div>
      <Search open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} />
    </>
  );
}
function DropProgram({ location }) {
  return (
    <>
      <Menu as={'div'} className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Menu.Button
              className={`px-6 inline-flex gap-x-3 w-full justify-center items-center text-sm transition-all  ${
                open ||
                location == '/rencana-strategis' ||
                location == '/rencana-kerja'
                  ? //  ||
                    // location == "/berita"
                    'bg-white  py-2 rounded-lg text-[#547153] font-bold transition-all'
                  : ''
              }`}
            >
              <p className="text-base">Program</p>
              {open ? (
                <>
                  <ArrowUp2 className="h-4 w-4" color="#000000" />
                </>
              ) : (
                <>
                  <ArrowDown2 className="h-4 w-4" color="#000000" />
                </>
              )}
            </Menu.Button>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute text-left right-0 mt-2 w-[250px] rounded-xl origin-top-right  bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink to={'/rencana-strategis'}>
                        <button className="hover:bg-bgHijauTransparentPrimary text-left group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                          <DocumentText color="#000000" className="mr-2" />
                          Rencana Strategis
                        </button>
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink to={'/rencana-kerja'}>
                        <button className="hover:bg-bgHijauTransparentPrimary group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                          <DocumentText color="#000000" className="mr-2" />
                          Rencana Kerja
                        </button>
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

function DropProgramMobile(params) {
  return (
    <>
      <Menu as={'div'} className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Menu.Button className={'flex flex-col w-full  '}>
              <div className="flex gap-x-3 justify-center items-center">
                Program
                {open ? (
                  <>
                    <ArrowUp2 className="h-6 w-6" color="#ffffff" />
                  </>
                ) : (
                  <>
                    <ArrowDown2 className="h-6 w-6" color="#ffffff" />
                  </>
                )}
              </div>
            </Menu.Button>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition-all ease-in duration-100"
              enterFrom="transform opacity-0 scale-95 translate-y-1"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95 -translate-y-1"
            >
              <div
                className={`mt-3 ${
                  open ? 'flex-col gap-y-5 list-disc px-5' : 'hidden'
                }`}
              >
                <button
                  className={`text-white group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm    `}
                >
                  <NavLink to={'/rencana-strategis'}>Rencana Strategis</NavLink>
                </button>

                <button
                  className={`text-white group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm    `}
                >
                  <NavLink to={'/rencana-kerja'}>Rencana Kerja</NavLink>
                </button>
              </div>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

function DropProfileMobile() {
  return (
    <>
      <Menu as={'div'} className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Menu.Button className={'flex flex-col w-full  '}>
              <div className="flex gap-x-3 justify-center items-center">
                Profile
                {open ? (
                  <>
                    <ArrowUp2 className="h-6 w-6" color="#ffffff" />
                  </>
                ) : (
                  <>
                    <ArrowDown2 className="h-6 w-6" color="#ffffff" />
                  </>
                )}
              </div>
            </Menu.Button>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition-all ease-in duration-100"
              enterFrom="transform opacity-0 scale-95 translate-y-1"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95 -translate-y-1"
            >
              <div
                className={`mt-3 ${
                  open ? 'flex-col gap-y-5 list-disc px-5' : 'hidden'
                }`}
              >
                <button
                  className={`text-white group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm    `}
                >
                  <NavLink to={'/profile'}>Profil</NavLink>
                </button>

                <button
                  className={`text-white group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm    `}
                >
                  <NavLink to={'/struktur-organisasi'}>
                    Struktur Organisasi
                  </NavLink>
                </button>
                <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                  <NavLink to={'/sejarah-jonggol'}>Sejarah</NavLink>
                </button>
                <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                  <NavLink to={'/visi-misi'}>Visi dan Misi</NavLink>
                </button>
              </div>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

function DropMobileMedia() {
  return (
    <>
      <Menu as={'div'} className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Menu.Button className={'flex flex-col w-full  '}>
              <div className="flex gap-x-3 justify-center items-center">
                Media & Informasi
                {open ? (
                  <>
                    <ArrowUp2 className="h-6 w-6" color="#ffffff" />
                  </>
                ) : (
                  <>
                    <ArrowDown2 className="h-6 w-6" color="#ffffff" />
                  </>
                )}
              </div>
            </Menu.Button>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition-all ease-in duration-100"
              enterFrom="transform opacity-0 scale-95 translate-y-1"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95 -translate-y-1"
            >
              <div
                className={`mt-3 ${
                  open ? 'flex-col gap-y-5 list-disc px-5' : 'hidden'
                }`}
              >
                <button
                  className={`text-white group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm    `}
                >
                  <NavLink to={'/berita'}>Berita</NavLink>
                </button>

                <button
                  className={`text-white group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm    `}
                >
                  <NavLink to={'/foto'}>Foto</NavLink>
                </button>
                {/* <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                  <NavLink to={"/video"}>Video</NavLink>
                </button> */}
                <button
                  className={`text-white group flex justify-start w-full items-center rounded-md px-2 py-1 text-sm    `}
                >
                  <NavLink to={'/agenda'}>Agenda</NavLink>
                </button>
              </div>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

function DropMedia({ location, slug }) {
  const activeDrop = 'text-[#547153] font-bold transition-all';
  const normalDrop = 'transition-all';

  return (
    <>
      <Menu as={'div'} className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Menu.Button
              className={`px-3 inline-flex w-full justify-center items-center text-sm transition-all  ${
                open ||
                location == '/foto' ||
                location == '/video' ||
                location == '/berita' ||
                location == '/agenda' ||
                location == `/berita/${slug}`
                  ? 'bg-white  py-2 rounded-lg text-[#547153] font-bold transition-all'
                  : ''
              }`}
            >
              <p className="text-sm mr-2">Media & Informasi</p>
              {open ? (
                <>
                  <ArrowUp2 className="h-5 w-5" color="#000000" />
                </>
              ) : (
                <>
                  <ArrowDown2 className="h-5 w-5" color="#000000" />
                </>
              )}
            </Menu.Button>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-[250px] rounded-xl origin-top-right  bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to={'/berita'}
                        className={({ active }) =>
                          active ? activeDrop : normalDrop
                        }
                      >
                        <button className="hover:bg-bgHijauTransparentPrimary group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                          <Book color="#000000" className="mr-2" />
                          Berita
                        </button>
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to={'/foto'}
                        className={({ active }) =>
                          active ? activeDrop : normalDrop
                        }
                      >
                        <button className="hover:bg-bgHijauTransparentPrimary group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                          <Image color="#000000" className="mr-2" />
                          Foto
                        </button>
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
                {/* <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button className=" group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                        <NavLink
                          to={"/video"}
                          className={({ active }) =>
                            active ? activeDrop : normalDrop
                          }
                        >
                          Video
                        </NavLink>
                      </button>
                    )}
                  </Menu.Item>
                </div> */}
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to={'/agenda'}
                        className={({ active }) =>
                          active ? activeDrop : normalDrop
                        }
                      >
                        <button className="hover:bg-bgHijauTransparentPrimary group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                          <Bookmark color="#000000" className="mr-2" />
                          Agenda
                        </button>
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

function DropProfile({ location }) {
  const activeDrop = 'text-[#547153] font-bold transition-all';
  const normalDrop = 'transition-all';
  return (
    <>
      <Menu as={'div'} className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Menu.Button
              className={`px-5 inline-flex gap-x-3 w-full justify-center items-center text-sm transition-all  ${
                open ||
                location == '/profile' ||
                location == '/struktur-organisasi' ||
                location == '/sejarah-jonggol' ||
                location == '/visi-misi'
                  ? //  ||
                    // location == "/berita"
                    'bg-white  py-2 rounded-lg text-[#547153] font-bold transition-all'
                  : ''
              }`}
            >
              <p className="text-base">Profile</p>
              {open ? (
                <>
                  <ArrowUp2 className="h-4 w-4" color="#000000" />
                </>
              ) : (
                <>
                  <ArrowDown2 className="h-4 w-4" color="#000000" />
                </>
              )}
            </Menu.Button>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute text-left right-0 mt-2 w-[250px] rounded-xl origin-top-right bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink to={'/profile'}>
                        <button className="hover:bg-bgHijauTransparentPrimary group flex w-full items-center rounded-md px-2 py-2 text-sm">
                          <Buildings2 color="#000000" className="mr-2" />
                          Profile
                        </button>
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink to={'/struktur-organisasi'}>
                        <button className="hover:bg-bgHijauTransparentPrimary group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                          <More2 color="#000000" className="mr-2" />
                          Struktur
                        </button>
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to={'/sejarah-jonggol'}
                        className={({ active }) =>
                          active ? activeDrop : normalDrop
                        }
                      >
                        <button className="hover:bg-bgHijauTransparentPrimary group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                          <Timer color="#000000" className="mr-2" />
                          Sejarah
                        </button>
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to={'/visi-misi'}
                        className={({ active }) =>
                          active ? activeDrop : normalDrop
                        }
                      >
                        <button className="hover:bg-bgHijauTransparentPrimary group flex w-full items-center rounded-md px-2 py-2 text-sm ">
                          <BookSquare color="#000000" className="mr-2" />
                          Visi Dan Misi
                        </button>
                      </NavLink>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

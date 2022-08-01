import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorClickIcon,
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    RefreshIcon,
    ShieldCheckIcon,
    SupportIcon,
    ViewGridIcon,
    XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import Image from 'next/image';
//import UserAccount from './UserAccount'
//import SignIn from '../SignIn'


// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

export default function DesktopMenu() {
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(true);

    return (
        <div className="relative footerfrist">
            <div className=" mx-12">
                <div className="flex  justify-between items-center py-4 lg:justify-start lg:space-x-10">
                    <div className="flex space-x-8 justify-between items-center md:w-auto lg:w-auto ">
                        <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
            <Image
                src="https://babacricnews.s3.ap-south-1.amazonaws.com/wp-content/uploads/2021/05/07112007/baba-logo-white.png"
                alt="BabaCric Logo"
                width={128}
                height={27.75}
            />
            </span>
          </Link>

                        {/* desktop menu */}

                        <Popover.Group as="nav" className="hidden lg:flex space-x-4">

                            {resources.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className=" flex items-start rounded-lg hover:bg-gray-50"
                                >

                                    <div className=" text-white">
                                        <p className="text-base font-medium text-gray-900">{item.name}</p>
                                    </div>
                                </a>
                            ))}

                        </Popover.Group>

                    </div>
                    {/* Mobile Menu icon */}

                    <div className="-mr-2 -my-2 lg:hidden">
                        <Popover>
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="duration-200 ease-out"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="duration-100 ease-in"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Popover.Panel focus className="z-40 absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden">
                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                                        <div className="pt-5 pb-6 px-5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <img
                                                        className="h-10 w-auto sm:h-10 mr-4 footerfrist"
                                                        src="http://testingwp.thenwg.xyz/wp-content/uploads/2022/07/Zakti.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="-mr-2">
                                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                        <span className="sr-only">Close menu</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </Popover.Button>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <nav className="grid gap-y-8">
                                                    {resources.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                                        >
                                                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                                                            <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                                        </a>
                                                    ))}
                                                </nav>
                                            </div>
                                        </div>

                                    </div>
                                </Popover.Panel>
                            </Transition>

                        </Popover>
                    </div>


                    <div className="hidden lg:flex items-center space-x-2 justify-end md:flex-1 ">

                        {/* user Account */}

                        <div class="relative  text-gray-600">
                            <button type="submit" class="absolute left-2 top-1  ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <input class="  bg-white h-7 pr-5 pl-10 py-1  rounded-full text-sm focus:outline-none"
                                type="search" name="search" placeholder="Search" />

                        </div>

                        <div className="py-1 bg-white text-sm  px-2 w-fit h-fit inline-flex items-center justify-center rounded-3xl boxshadow "
                            onClick={() => {

                                console.log("trisha ke shadi se pehle without god liye bacche");
                                setShowLoginModal(!showLoginModal);
                            }}>
                            Log In
                        </div>

                        {/* {<SignIn show={showLoginModal} setShow={setShowLoginModal} />} */}


                        <a className="py-1 bg-white  text-sm  px-2 w-fit h-fit inline-flex items-center justify-center rounded-3xl boxshadow  " >
                            Sign-Up
                        </a>

                        {/* {<SignUp />
                        } */}


                        {/* for login user

                        <a href="#" className="py-1 bg-white  px-2 w-fit h-fit inline-flex items-center justify-center rounded-3xl boxshadow  " >
                            Get it Free
                        </a> */}

                        {/* <UserAccount /> */}
                    </div>
                </div>
            </div>

        </div>
    )
}




const resources = [
    {
        name: 'Home',
        description: 'Get all of your questions answered in our forums or contact support.',
        href: '#',
        icon: SupportIcon,
    },
    {
        name: 'My Feed',
        description: 'Learn how to maximize our platform to get the most out of it.',
        href: '#',
        icon: BookmarkAltIcon,
    },
    {
        name: 'About us',
        description: 'See what meet-ups and other events we might be planning near you.',
        href: '#',
        icon: CalendarIcon,
    },
    { name: 'Explore', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },

    {
        name: 'Topics',
        description: 'See what meet-ups and other events we might be planning near you.',
        href: '#',
        icon: CalendarIcon,
    },

    {
        name: 'Scrapbook',
        description: 'See what meet-ups and other events we might be planning near you.',
        href: '#',
        icon: CalendarIcon,
    },

    {
        name: 'Contact us',
        description: 'See what meet-ups and other events we might be planning near you.',
        href: '#',
        icon: CalendarIcon,
    },

]
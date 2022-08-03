import React, { Fragment, useState, useEffect } from "react";

import Link from "next/link";
import { getCategories } from "../services";
import { getHeaderMenuByName } from "../services/api";
import Image from "next/image";

import { Popover, Transition } from "@headlessui/react";
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
} from "@heroicons/react/outline";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesMobile, setCategoriesMobile] = useState([]);

  useEffect(() => {
    // getCategories().then((newCategories) => {
    //   setCategories(newCategories);
    // });

    getHeaderMenuByName(process.env.headerMenuName).then((newCategories) => {
      setCategories(newCategories.menu.menuItems.edges.reverse());
      setCategoriesMobile(newCategories.menu.menuItems.edges);
    });
  }, []);

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="border-b w-full inline-block border-blue-400 py-8">
          <div className="float-left block">
            <Link href="/">
              <span className="cursor-pointer font-bold text-4xl text-white">
                <Image
                  src="https://babacricnews.s3.ap-south-1.amazonaws.com/wp-content/uploads/2021/05/07112007/baba-logo-white.png"
                  alt="BabaCric Logo"
                  width={128}
                  height={27.75}
                  placeholder="blur"
                />
              </span>
            </Link>
          </div>

          <div className="hidden float-left md:contents">
            {/* desktop menu */}
            {categories.map((category, index) => (
              <Link key={index} href={`${category.node.path}`}>
                <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                  {category.node.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="lg:hidden float-right md:contents">
            {/* mobile menu */}
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
                <Popover.Panel
                  focus
                  className="z-40 absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                    <div className="pt-5 pb-6 px-5">
                      <div className="flex items-center justify-between">
                        <div className="-mr-2">
                          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <nav className="grid gap-y-8">
                          {categoriesMobile.map((category, index) => (
                            <a
                              key={category.node.label}
                              href={category.node.path}
                              className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                            >
                              <span className="ml-3 text-base font-medium text-gray-900">
                                {category.node.label}
                              </span>
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
        </div>
      </div>
    </>
  );
};

export default Header;

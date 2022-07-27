import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCategories } from '../services';
import { getHeaderMenuByName } from '../services/api';

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // getCategories().then((newCategories) => {
    //   setCategories(newCategories);
    // });

    getHeaderMenuByName(process.env.headerMenuName).then((newCategories) => {
      setCategories(newCategories.menu.menuItems.edges.reverse());
      console.log("category = ",categories)
      console.log("Newcategory = ",newCategories)
    });
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">Graph CMS</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`${category.node.path}`}><span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{category.node.label}</span></Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;

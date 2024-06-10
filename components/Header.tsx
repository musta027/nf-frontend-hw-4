import React from "react";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex shadow-sm items-center justify-between p-4" style={{ backgroundColor: 'rgb(0, 47, 52)' }}>
      <Link href="/" className="text-2xl text-white font-bold">
        <img src="public/olx.png" alt="OLX Logo" />
      </Link>
      <Link href="/productCreate" className="text-black font-medium text-x-l bg-white text-black px-4 py-2 rounded">
        Подать объявление
      </Link>
    </div>
  );
};


export default Header;
import React from "react";
import { ModeToggle } from "./mode";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className={``}>
      <div className="flex my-[20px] mainHeading justify-between  container ">
        <Link href={"/"} className="flex align-middle text-center ">
          <Image src={"/images/logo.png"} alt="logo" height={50} width={50} />
          <span className="top-10">Numerology</span>
        </Link>
        <ModeToggle />
      </div>
      <div className="border-b-2"></div>
    </div>
  );
};

export default Header;

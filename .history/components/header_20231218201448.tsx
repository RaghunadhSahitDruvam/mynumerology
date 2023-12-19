import React from "react";
import { ModeToggle } from "./mode";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className={``}>
      <div className="flex my-[20px] mainHeading justify-between  container ">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" height={50} width={100} />
          Numerology
        </Link>
        <ModeToggle />
      </div>
      <div className="border-b-2"></div>
    </div>
  );
};

export default Header;

import React from "react";
import { ModeToggle } from "./mode";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className={``}>
      <div className="flex my-[20px] mainHeading justify-between  container ">
        <Link href={"/"} className="flex align-middle text-center ">
          <Image src={"/images/logo.png"} alt="logo" height={50} width={50} />
          <span className="mt-[10px]">Numerology</span>
        </Link>
        <div className="flex gap-[5px]">
          <Link href={"/"}>
            <Button variant={"link"}>Home</Button>{" "}
          </Link>
          <Link href={"/data"}>
            <Button variant={"link"}>Saved Table</Button>{" "}
          </Link>
          <ModeToggle />
        </div>
      </div>
      <div className="border-b-2"></div>
    </div>
  );
};

export default Header;

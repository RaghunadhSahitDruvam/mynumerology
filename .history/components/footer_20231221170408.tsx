import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 bottom-0 fixed w-full p-[10px]">
      <div className="pb-2">
        <p className="text-center">
          Made by <span className="underline">Raghunadh Sahit Druvam</span>
        </p>
      </div>
    </footer>
  );
}

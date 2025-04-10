"use client";
import Header from "@/components/header";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Page = () => {
  const [textName, setTextName] = useState<string>("");
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // https://phinzi.com/convert?name=jhk
  };
  return (
    <div className={``}>
      <Header />

      <div>
        <form
          className={"container gap flex justify-between"}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
        >
          <Input
            type="text"
            placeholder="Name"
            className="w-[70%]"
            onChange={(e) => setTextName(e.target.value)}
          />
          <Button type="submit">
            Calculate {"  "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;

"use client";
import Header from "@/components/header";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import axios from "axios";
const Page = () => {
  const [textName, setTextName] = useState<string>("");
  const [dataSource, setDataSource] = useState<datasourcetype | null>();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(`https://phinzi.com/convert?name=${textName}`)
      .then((res) => setDataSource(res.data));
  };
  console.log(dataSource);
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

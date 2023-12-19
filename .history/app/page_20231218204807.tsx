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
      <div>
        <table border={2} className="border-2 border-black">
          <thead className="border-2  border-black">
            <tr className="border-2  border-black">
              <th className="border-2  border-black">Group</th>
              <th className="border-2  border-black">Name</th>
              <th className="border-2  border-black">Total</th>
              <th className="border-2  border-black">V</th>
              <th className="border-2  border-black">C</th>
            </tr>
          </thead>
          <tbody className="border-2  border-black">
            <tr className="border-2  border-black">
              <td className="border-2  border-black">C</td>
              <td className="px-[20px] border-2  border-black">
                <table
                  className="px-[20px] "
                  dangerouslySetInnerHTML={{
                    __html:
                      typeof dataSource !== "undefined" &&
                      dataSource?.name_g2_block,
                  }}
                />
              </td>

              <td className="border-2  border-black">{dataSource?.g2tot}</td>
              <td className="border-2  border-black"> {dataSource?.g2vtot}</td>
              <td className="border-2  border-black">
                {" "}
                {dataSource?.g2nettot}
              </td>
            </tr>
            <tr className="border-2  border-black">
              <td className="border-2  border-black">P</td>
              <td className="px-[20px] border-2  border-black">
                <table
                  className="px-[20px] "
                  dangerouslySetInnerHTML={{
                    __html:
                      typeof dataSource !== "undefined" &&
                      dataSource?.name_g3_block,
                  }}
                />
              </td>

              <td className="border-2  border-black">{dataSource?.g3tot}</td>
              <td className="border-2  border-black"> {dataSource?.g3vtot}</td>
              <td className="border-2  border-black">
                {" "}
                {dataSource?.g3nettot}
              </td>
            </tr>
          </tbody>
        </table>
        <div className=""> Total Letters - {dataSource?.tot_letters}</div>
      </div>
    </div>
  );
};

export default Page;

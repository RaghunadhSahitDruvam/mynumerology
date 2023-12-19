// @ts-nocheck
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Header from "@/components/header";
import Image from "next/image";

interface DataSource {
  name_g2_block?: string;
  name_g3_block?: string;
  g2tot?: number;
  g2vtot?: number;
  g2nettot?: number;
  g3tot?: number;
  g3vtot?: number;
  g3nettot?: number;
  tot_letters?: number;
}

const Page: React.FC = () => {
  const [textName, setTextName] = useState<string>("");
  const [dataSource, setDataSource] = useState<DataSource | null>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(`https://phinzi.com/convert?name=${textName}`)
      .then((res) => setDataSource(res.data));
  };

  return (
    <div className="">
      <Header />

      <div>
        <form
          className="container gap flex justify-between"
          onSubmit={submitHandler}
        >
          <Input
            type="text"
            placeholder="Name"
            className="w-[70%]"
            onChange={(e) => setTextName(e.target.value)}
          />
          <Button type="submit">
            Calculate <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
      {dataSource ? (
        <>
          <div className="container mt-[30px] flex items-start justify-start">
            <table border={2} className="border-2 dark:border-white">
              <thead className="border-2  dark:border-white p-[20px]">
                <tr className="border-2  dark:border-white">
                  <th className="border-2  dark:border-white px-[20px]">
                    Group
                  </th>
                  <th className="border-2  dark:border-white">Name</th>
                  <th className="border-2  dark:border-white px-[20px]">
                    Total
                  </th>
                  <th className="border-2  dark:border-white px-[20px]">V</th>
                  <th className="border-2  dark:border-white px-[20px]">C</th>
                </tr>
              </thead>
              <tbody className="border-2  dark:border-white">
                <tr className="border-2  dark:border-white">
                  <td className="border-2  dark:border-white">C</td>
                  <td className="px-[20px] border-2  dark:border-white">
                    <table
                      className="px-[20px] table-padding"
                      dangerouslySetInnerHTML={{
                        __html:
                          typeof dataSource !== "undefined" &&
                          dataSource?.name_g2_block,
                      }}
                    ></table>
                  </td>

                  <td className="border-2  dark:border-white">
                    {dataSource?.g2tot}
                  </td>
                  <td className="border-2  dark:border-white">
                    {" "}
                    {dataSource?.g2vtot}
                  </td>
                  <td className="border-2  dark:border-white">
                    {" "}
                    {dataSource?.g2nettot}
                  </td>
                </tr>
                <tr className="border-2  dark:border-white">
                  <td className="border-2  dark:border-white">P</td>
                  <td className="px-[20px] border-2  dark:border-white">
                    <table
                      className="px-[20px] table-padding"
                      dangerouslySetInnerHTML={{
                        __html:
                          typeof dataSource !== "undefined" &&
                          dataSource?.name_g3_block,
                      }}
                    ></table>
                  </td>

                  <td className="border-2  dark:border-white">
                    {dataSource?.g3tot}
                  </td>
                  <td className="border-2  dark:border-white">
                    {" "}
                    {dataSource?.g3vtot}
                  </td>
                  <td className="border-2  dark:border-white">
                    {" "}
                    {dataSource?.g3nettot}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-[10px]">
            {" "}
            Total Letters - {dataSource?.tot_letters}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <Image
              className="justify-center align-middle items-center"
              src={"/images/up.png"}
              alt="rabbit_showing_up"
              height={100}
              width={100}
            />
          </div>
          <div className="container flex justify-center align-middle">
            <h1>Please write Name up something to get started ...</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

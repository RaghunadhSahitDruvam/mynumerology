// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Header from "@/components/header";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  let [textName, setTextName] = useState<string>("");
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  let search = searchParams.get("name");
  const router = useRouter();
  const saveHandler = async (dataSource: DataSource) => {
    setLoading(true);
    await axios
      .post("/api/save", {
        chaldean: dataSource.name_g2_block,
        pythogorous: dataSource.name_g3_block,
        tot_letters: dataSource.tot_letters,
        g2tot: dataSource.g2tot,
        g3tot: dataSource.g3tot,
        g2vtot: dataSource.g2vtot,
        g3vtot: dataSource.g3vtot,
        g2nettot: dataSource.g2nettot,
        g3nettot: dataSource.g3nettot,
      })
      .then((res) => {
        setLoading(false);
        toast.success("Name successfully added to Database ⭐!");
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    // Set initial value only if it's different from the current state
    if (search !== null && search !== textName) {
      setTextName(search);
    }
  }, [search, textName]);

  const inputFocusRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    inputFocusRef.current.focus();
    if (search !== null) {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  }, []);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(
        `https://phinzi.com/convert?name=${textName
          .replaceAll(".", "")
          .replaceAll(",", "")
          .replaceAll(" - ", "")
          .replaceAll("-", " ")
          .replaceAll(";", "")
          .replaceAll("(", "")
          .replaceAll(" & ", "")
          .replaceAll(")", "")
          .replaceAll("/", "")
          .replaceAll(":", "")
          .replaceAll("  ", " ")
          .replaceAll("[", "")
          .replaceAll("]", "")}`
      )
      .then((res) => setDataSource(res.data));
  };

  const updateURL = (newTextName: string) => {
    // Save the current cursor position
    const cursorPosition = inputFocusRef.current.selectionStart;

    // Update the URL without a page reload
    const cleanedText = newTextName
      .replaceAll(".", "")
      .replaceAll(",", "")
      .replaceAll(" - ", "")
      .replaceAll("-", " ")
      .replaceAll(";", "")
      .replaceAll("&", " ")
      .replaceAll("/", "")
      .replaceAll(":", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("  ", " ")
      .replaceAll("[", "")
      .replaceAll("]", "");

    if (cleanedText !== textName) {
      router.push(`?name=${encodeURIComponent(cleanedText)}`);
    }

    // Restore the cursor position
    if (inputFocusRef.current && cursorPosition !== null) {
      inputFocusRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  return loading ? (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-gray-900 rounded-full" />
    </div>
  ) : (
    <div className="">
      <Header />

      <div>
        <form
          className="container gap flex justify-between"
          onSubmit={(e) => submitHandler(e)}
        >
          <Input
            type="text"
            placeholder="Name"
            className="w-[70%]"
            value={textName
              .replaceAll(".", "")
              .replaceAll(",", "")
              .replaceAll(" - ", "")
              .replaceAll("-", " ")
              .replaceAll(";", "")
              .replaceAll("(", "")
              .replaceAll(")", "")
              .replaceAll("&", " ")
              .replaceAll("/", "")
              .replaceAll(":", "")
              .replaceAll("  ", " ")
              .replaceAll("[", "")
              .replaceAll("]", "")}
            ref={inputFocusRef}
            onChange={(e) => {
              const newValue = e.target.value;
              setTextName(newValue);
              // updateURL(newValue); // Update the URL when input changes
            }}
          />

          <Button
            type="submit"
            ref={buttonRef}
            disabled={textName.length === 0}
          >
            Calculate <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
      {dataSource ? (
        <>
          <div className="container mt-[30px] flex items-start justify-start">
            <table
              border={2}
              className="border-4dark:border-white border-yellow-600"
            >
              <thead className="border-4 dark:border-white border-yellow-600 p-[20px]">
                <tr className="border-4 dark:border-white border-yellow-600">
                  <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900]">
                    Grp.
                  </th>
                  <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900]">
                    Name
                  </th>
                  <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900]">
                    Total
                  </th>
                  <th className="border-4  dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900]">
                    V
                  </th>
                  <th className="border-4px-[10px]  dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900] text-2xl">
                    C
                  </th>
                </tr>
              </thead>
              <tbody className="border-4 dark:border-white border-yellow-600 text-[#960084] font-[900]">
                <tr className="border-4 dark:border-white border-yellow-600">
                  <td className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl ">
                    C
                  </td>
                  <td className=" border-4 dark:border-white border-yellow-600 ">
                    <table
                      className=" table-padding text-2xl"
                      dangerouslySetInnerHTML={{
                        __html:
                          typeof dataSource !== "undefined" &&
                          dataSource?.name_g2_block,
                      }}
                    ></table>
                  </td>

                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {dataSource?.g2tot}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {" "}
                    {dataSource?.g2vtot}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {" "}
                    {dataSource?.g2nettot}
                  </td>
                </tr>
                <tr className="border-4 dark:border-white border-yellow-600">
                  <td className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl ">
                    P
                  </td>
                  <td className=" border-4 dark:border-white border-yellow-600">
                    <table
                      className=" table-padding text-2xl"
                      dangerouslySetInnerHTML={{
                        __html:
                          typeof dataSource !== "undefined" &&
                          dataSource?.name_g3_block,
                      }}
                    ></table>
                  </td>

                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {dataSource?.g3tot}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {" "}
                    {dataSource?.g3vtot}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {" "}
                    {dataSource?.g3nettot}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container flex  items-start mt-[10px] justify-between">
            {" "}
            <span className="text-green-600  text-2xl font-[900]">
              Total Letters - {dataSource?.tot_letters}
            </span>
            <div className="">
              {/* <Button variant={"default"} className="mr-[10px]"> */}
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant={"default"} className="mr-[10px]">
                    Save
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Do you want to save this name -{" "}
                      <b>{textName.toUpperCase()}</b> ?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => saveHandler(dataSource)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {/* </Button> */}
              <Link href={"/"}>
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    setTextName("");
                    setDataSource(null);
                  }}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container flex justify-center align-middle">
            <h1>Please write your name to get started...</h1>
          </div>
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <Footer /> */}
    </div>
  );
};

export default Page;

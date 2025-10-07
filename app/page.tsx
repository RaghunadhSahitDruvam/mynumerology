// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
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
import { useSearchParams } from "next/navigation";

interface DataSource {
  name_g1_block?: string;
  name_g2_block?: string;
  name_g3_block?: string;
  g1tot?: number;
  g1vtot?: number;
  g1nettot?: number;
  g2tot?: number;
  g2vtot?: number;
  g2nettot?: number;
  g3tot?: number;
  g3vtot?: number;
  g3nettot?: number;
  tot_letters?: number;
  dob_tot?: number;
}

const Page: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [textName, setTextName] = useState<string>("");

  const saveHandler = async (dataSource: DataSource) => {
    setLoading(true);
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chaldean: dataSource.name_g2_block,
          pythogorous: dataSource.name_g3_block,
          tot_letters: dataSource.tot_letters,
          g2tot: dataSource.g2tot,
          g3tot: dataSource.g3tot,
          g2vtot: dataSource.g2vtot,
          g3vtot: dataSource.g3vtot,
          g2nettot: dataSource.g2nettot,
          g3nettot: dataSource.g3nettot,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      setLoading(false);
      toast.success("Name successfully added to Database ⭐!");
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "An error occurred");
    }
  };

  // Function to sanitize input by removing special characters and extra spaces
  const sanitizeInput = (input: string): string => {
    // Remove special characters, keeping only letters, numbers, and spaces
    const withoutSpecialChars = input.replace(/[^\w\s]/gi, "");
    // Replace multiple spaces with a single space and trim
    return withoutSpecialChars.replace(/\s+/g, " ").trim();
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textName.trim()) {
      toast.error("Please enter a name");
      return;
    }

    // Sanitize the input before sending the request
    const sanitizedName = sanitizeInput(textName);

    setLoading(true);

    try {
      const response = await fetch(
        `/api/convert?name=${encodeURIComponent(sanitizedName)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // Ensure we have numeric values
      const processedData = {
        ...data,
        tot_letters: Number(data.tot_letters) || 0,
        g1tot: Number(data.g1tot) || 0,
        g2tot: Number(data.g2tot) || 0,
        g3tot: Number(data.g3tot) || 0,
        g1vtot: Number(data.g1vtot) || 0,
        g2vtot: Number(data.g2vtot) || 0,
        g3vtot: Number(data.g3vtot) || 0,
        g1nettot: Number(data.g1nettot) || 0,
        g2nettot: Number(data.g2nettot) || 0,
        g3nettot: Number(data.g3nettot) || 0,
      };

      setDataSource(processedData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "An error occurred");
    }
  };

  const inputFocusRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (inputFocusRef.current) {
      inputFocusRef.current.focus();
    }
  }, []);

  return loading ? (
    <div className="flex items-center justify-center h-screen dark:bg-gray-900 dark:text-white bg-gray-100  ">
      <div className="animate-spin h-12 w-12 border-t-2 border-b-2 dark:border-white border-black rounded-full" />
    </div>
  ) : (
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
            value={textName}
            ref={inputFocusRef}
            onChange={(e) => setTextName(e.target.value)}
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
              className="border-4 dark:border-white border-yellow-600"
            >
              <thead className="border-4 dark:border-white border-yellow-600 p-[20px]">
                <tr className="border-4 dark:border-white border-yellow-600">
                  <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                    Grp.
                  </th>
                  <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                    Name
                  </th>
                  <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                    Total
                  </th>
                  <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                    V
                  </th>
                  <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                    C
                  </th>
                </tr>
              </thead>
              <tbody className="border-4 dark:border-white border-yellow-600 text-[#960084] font-[900]">
                <tr className="border-4 dark:border-white border-yellow-600">
                  <td className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl ">
                    C
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600">
                    <table
                      className="table-padding text-2xl"
                      dangerouslySetInnerHTML={{
                        __html: dataSource?.name_g2_block || "",
                      }}
                    ></table>
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {dataSource?.g2tot || 0}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {dataSource?.g2vtot || 0}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {dataSource?.g2nettot || 0}
                  </td>
                </tr>
                <tr className="border-4 dark:border-white border-yellow-600">
                  <td className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl ">
                    P
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600">
                    <table
                      className="table-padding text-2xl"
                      dangerouslySetInnerHTML={{
                        __html: dataSource?.name_g1_block || "",
                      }}
                    ></table>
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {dataSource?.g1tot || 0}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {dataSource?.g1vtot || 0}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                    {dataSource?.g1nettot || 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container flex items-start mt-[10px] justify-between">
            <span className="text-green-600 text-2xl font-[900]">
              Total Letters - {dataSource?.tot_letters || 0}
            </span>
            <div className="">
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
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default Page;

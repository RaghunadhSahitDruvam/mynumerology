"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ButtonComponent = ({ id }: { id: any }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const deleteHandler = async (itemId: string) => {
    try {
      setLoading(true);
      await axios
        .delete(`/api/save`, {
          data: {
            id: itemId,
          },
        })
        .then((res) => {
          setLoading(false);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return loading ? (
    <div className=" ">
      <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-gray-900 rounded-full" />
    </div>
  ) : (
    <div>
      {" "}
      {/* <Button variant={"destructive"} >
    delete
  </Button> */}
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={"destructive"} className="mr-[10px]">
            delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to delete this name ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteHandler(id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
    </div>
  );
};

export default ButtonComponent;

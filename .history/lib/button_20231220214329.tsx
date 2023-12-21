"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const ButtonComponent = ({ _id }: { _id: string }) => {
  const deleteHandler = (id: string) => {
    console.log(id);
  };
  return (
    <div>
      {" "}
      <Button variant={"destructive"} onClick={() => deleteHandler(_id)}>
        delete
      </Button>
    </div>
  );
};

export default ButtonComponent;

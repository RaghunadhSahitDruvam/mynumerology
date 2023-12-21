"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const ButtonComponent = ({ id }: { id: any }) => {
  const deleteHandler = (itemId: string) => {
    console.log("ad", itemId);
  };
  return (
    <div>
      {" "}
      <Button variant={"destructive"} onClick={() => deleteHandler(id)}>
        delete
      </Button>
    </div>
  );
};

export default ButtonComponent;

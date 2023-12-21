"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const ButtonComponent = ({ id }: { id: string }) => {
  const deleteHandler = (id: string) => {
    console.log(id);
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

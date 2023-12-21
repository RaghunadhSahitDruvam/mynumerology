"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const ButtonComponent = ({ id }: { id: any }) => {
  console.log(id);
  return (
    <div>
      {" "}
      <Button variant={"destructive"} onClick={() => console.log(id)}>
        delete
      </Button>
    </div>
  );
};

export default ButtonComponent;

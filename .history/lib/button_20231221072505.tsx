"use client";
import { Button } from "@/components/ui/button";
import Item from "@/models/item";
import axios from "axios";
import React from "react";

const ButtonComponent = ({ id }: { id: any }) => {
  const deleteHandler = async (itemId: string) => {
    try {
      await axios
        .delete(`/api/save`, {
          data: {
            id: itemId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
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

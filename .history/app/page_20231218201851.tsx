import Header from "@/components/header";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Page = () => {
  return (
    <div className={``}>
      <Header />

      <div>
        <form className={"container gap flex justify-between"}>
          <Input type="text" placeholder="Name" className="w-[70%]" />
          <Button type="submit">
            Calculate {"  "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;

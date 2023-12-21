import Header from "@/components/header";
import getDataForCheckout from "@/lib/getDatafordata";
import React from "react";

const page = async () => {
  const data = await getDataForCheckout();
  console.log(data);
  return (
    <div>
      <Header />

      {data?.toString()}
    </div>
  );
};

export default page;

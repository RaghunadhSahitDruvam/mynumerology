import getDataForCheckout from "@/lib/getDatafordata";
import React from "react";

const page = async () => {
  const data = await getDataForCheckout();
  console.log(data);
  return <div>Woo</div>;
};

export default page;

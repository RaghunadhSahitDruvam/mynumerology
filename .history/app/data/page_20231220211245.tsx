import Header from "@/components/header";
import getDataForCheckout from "@/lib/getDatafordata";
import React from "react";

const page = async () => {
  const data = await getDataForCheckout();
  console.log(data);
  return (
    <div>
      <Header />
      <div className="mt-[50px] container">
        <table>
          <thead>
            <tr>
              <th className="list_b">Group</th>
              <th className="list_b">Name</th>
              <th className="list_b">Total</th>
              <th className="list_b">V</th>
              <th className="list_b">C</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default page;

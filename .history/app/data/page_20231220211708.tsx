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
          <tbody>
            {data?.map((i: any, index: number) => (
              <tr>
                <td>C</td>
                <td dangerouslySetInnerHTML={{ __html: i.chaldean }} />
                <td id="g2tot">{i.g2tot}</td>
                <td id="g2vtot">{i.g2vtot}</td>
                <td id="g2nettot">{i.g2nettot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;

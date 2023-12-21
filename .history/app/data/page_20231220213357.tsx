import Header from "@/components/header";
import getDataForCheckout from "@/lib/getDatafordata";
import React from "react";

const page = async () => {
  const data = await getDataForCheckout();
  return (
    <div>
      <Header />
      <h1 className="text-center text-2xl mt-[20px]">⭐ Saved Names ⭐</h1>
      <div className="container mt-[30px] flex items-center justify-center">
        <table
          border={2}
          className="border-4dark:border-white border-yellow-600"
        >
          <thead className="border-4 dark:border-white border-yellow-600 p-[20px]">
            <tr className="border-4 dark:border-white border-yellow-600">
              <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900]">
                Grp.
              </th>
              <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900]">
                Name
              </th>
              <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900]">
                Total
              </th>
              <th className="border-4  dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900]">
                V
              </th>
              <th className="border-4px-[10px]  dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900] text-2xl">
                C
              </th>
              <th className="border-4px-[10px]  dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl font-[900] text-2xl">
                Delete
              </th>
            </tr>
          </thead>
          {data?.map((i: any, index: number) => (
            <tbody
              key={index}
              className="border-4 dark:border-white border-yellow-600 text-[#960084] font-[900]"
            >
              <tr className="border-4 dark:border-white border-yellow-600">
                <td className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl ">
                  C
                </td>
                <td className=" border-4 dark:border-white border-yellow-600 ">
                  <table
                    className=" table-padding text-2xl"
                    dangerouslySetInnerHTML={{
                      __html: i.chaldean,
                    }}
                  ></table>
                </td>

                <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                  {i.g2tot}
                </td>
                <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                  {" "}
                  {i.g2vtot}
                </td>
                <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                  {" "}
                  {i.g2nettot}
                </td>
                <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                  {" "}
                  <button>Delete</button>
                </td>
              </tr>
              <tr className="border-4 dark:border-white border-yellow-600">
                <td className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white  text-2xl ">
                  P
                </td>
                <td className=" border-4 dark:border-white border-yellow-600">
                  <table
                    className=" table-padding text-2xl"
                    dangerouslySetInnerHTML={{
                      __html: i.pythogorous,
                    }}
                  ></table>
                </td>

                <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                  {i.g3tot}
                </td>
                <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                  {" "}
                  {i.g3vtot}
                </td>
                <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white ">
                  {" "}
                  {i.g3nettot}
                </td>
              </tr>
              &nbsp;
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default page;

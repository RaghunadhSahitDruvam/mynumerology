// Import necessary modules and components
import Header from "@/components/header";
import getDataForCheckout from "@/lib/getDatafordata";
import React from "react";

// Define the functional component
const Page = async () => {
  // Fetch data asynchronously
  const data = await getDataForCheckout();

  // Return the JSX structure
  return (
    <div>
      {/* Include the Header component */}
      <Header />

      {/* Page title */}
      <h1 className="text-center text-2xl mt-[20px]">⭐ Saved Names ⭐</h1>

      {/* Container for the table */}
      <div className="container mt-[30px] flex items-center justify-center">
        {/* Main table */}
        <table
          border={2}
          className="border-4 dark:border-white border-yellow-600"
        >
          {/* Table header */}
          <thead className="border-4 dark:border-white border-yellow-600 p-[20px]">
            <tr className="border-4 dark:border-white border-yellow-600">
              <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                Grp.
              </th>
              <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                Name
              </th>
              <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                Total
              </th>
              <th className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                V
              </th>
              <th className="border-4px-[10px] dark:border-white border-yellow-600 bg-green-600 text-white text-2xl font-[900]">
                C
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {/* Map over data to generate rows */}
            {data?.map((i: any, index: number) => (
              <React.Fragment key={index}>
                {/* First row */}
                <tr className="border-4 dark:border-white border-yellow-600">
                  <td className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl">
                    C
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600">
                    <div
                      className="table-padding text-2xl"
                      dangerouslySetInnerHTML={{ __html: i.chaldean }}
                    />
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white">
                    {i.g2tot}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white">
                    {i.g2vtot}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white">
                    {i.g2nettot}
                  </td>
                </tr>

                {/* Second row */}
                <tr className="border-4 dark:border-white border-yellow-600">
                  <td className="border-4 dark:border-white border-yellow-600 bg-green-600 text-white text-2xl">
                    P
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600">
                    <div
                      className="table-padding text-2xl"
                      dangerouslySetInnerHTML={{ __html: i.pythogorous }}
                    />
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white">
                    {i.g3tot}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white">
                    {i.g3vtot}
                  </td>
                  <td className="border-4 dark:border-white border-yellow-600 text-2xl bg-green-600 text-white">
                    {i.g3nettot}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Export the component
export default Page;

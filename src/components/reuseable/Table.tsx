import {
  SupplierManagementCard,
  SupplierManagementProps,
} from "@/constants/props";
import { useNavigate } from "react-router-dom";

/**
 * lazy loading the content of the table:
 * ? https://www.geeksforgeeks.org/lazy-loading-in-react-and-how-to-implement-it/
 * 
 * import React from "react";
  import { Suspense, lazy } from "react";
  const Component1 = lazy(() => import(
      '../src/LazyContent/myComponent1'))
  const Component2 = lazy(() => import(
      '../src/LazyContent/myComponent2'))
  function App() {
      return (
          <>
              <h1> Lazy Load</h1>
              <Suspense fallback=
  {<div>Component1 are loading please wait...</div>}>
                  <Component1 />
              </Suspense>
              <Suspense fallback=
  {<div>Component2 are loading please wait...</div>}>
                  <Component2 />
              </Suspense>
          </>
      );
  }
    
  export default App;
 */

const Table = () => {
  const navigate = useNavigate();

  const handleAddingNewForm = (data: SupplierManagementCard) => {
    navigate(`${data.route}`, { state: data });
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="font-bold text-sm text-black">
            <th>Supplier</th>
            <th>
              <span className="hidden sm:block">Location</span>
            </th>
            <th>
              <span className="hidden lg:block">abcde</span>
            </th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {SupplierManagementProps.map((value) => (
            <tr
              key={`SupplierManagementKey${value.route}`}
              className="hover:cursor-pointer hover:text-primary"
              onClick={() => handleAddingNewForm(value)}
            >
              <td className="flex flex-col gap-y-2">
                {value.title}{" "}
                <span className="sm:hidden">{value.subtitle}</span>
              </td>
              <td>
                <span className="hidden sm:block">{value.subtitle}</span>
              </td>
              <td>
                <span className="hidden lg:block"></span>
              </td>
              <td>{value.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

import { SupplierManagementProps } from "@/constants/props";

const Table = () => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="font-bold text-sm text-black">
            <th>Supplier</th>
            <th>Location</th>
            <th>abcde</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {SupplierManagementProps.map((value, index) => (
            <tr
              key={`SupplierManagementKey${index}`}
              className="hover:cursor-pointer hover:text-primary"
            >
              <td>{value.title}</td>
              <td>{value.subtitle}</td>
              <td></td>
              <td>{value.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

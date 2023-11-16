import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import UserInformation from "./user-information";
import JobInformation from "./job-information";
import RoleManagement from "./role-management";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const UserManagement = () => {
  const location = useLocation();

  const arrayEndpoint = location.pathname.split("/");
  const id = arrayEndpoint[arrayEndpoint.length - 1];

  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <section className={headerBackClass}>
      <HeaderWithBack text="User Management" />
      <div className="flex flex-col items-center justify-center mt-10">
        <form className="p-2 flex flex-col gap-y-4 w-full lg:w-[60%] py-10 bg-white px-6">
          <UserInformation
            id={id}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
          <JobInformation isDisabled={isDisabled} />
          <RoleManagement isDisabled={isDisabled} />
        </form>
      </div>
    </section>
  );
};

export default UserManagement;

import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";

import Table from "../Shared/Table";
import Tooltip from "../UI/Tooltip";
import { DeleteSvg, UserCircleSvg } from "../../icons/AllSvgs";
import AlertDialog from "../UI/AlertDialog";
import { deleteAlertDescription } from "../../utils/constants";
import Search from "../Shared/Search";

import TableFilters from "../Shared/TableFilters";

import { useUsersData } from "../../hooks/useQueryData";
import { UserType } from "../../types";

const columnHelper = createColumnHelper<UserType>();

export default function UserTable() {
  const { data, isLoading, isError } = useUsersData();
  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", {
        header: "First Name",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-4">
            <UserCircleSvg className="h-7 text-grayText" />
            <span className="font-medium">{getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor("lastName", {
        header: "Last Name",
        cell: ({ getValue }) => (
          <div className="flex items-center gap-4">
            <span className="font-medium">{getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
      }),
      columnHelper.accessor("isActive", {
        header: "Status",
        cell: ({ getValue }) => (
          <span
            className="font-thin"
            style={
              getValue()
                ? { color: "rgb(34 197 94)" }
                : { color: "rgb(220 38 38)" }
            }
          >
            {getValue() ? "Active" : "Inactive"}
          </span>
          // </div>
        ),
      }),

      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: () => (
          <div className="flex gap-4">
            {/* <UserFormModal
              isEdit={true}
              data={row}
              handleUpdate={handleUpdate}
              triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
            >
              <Tooltip content="Edit" asChild>
                <span>
                  <EditSvg className="h-6" />
                </span>
              </Tooltip>
            </UserFormModal> */}

            <AlertDialog
              description={deleteAlertDescription}
              btnText="Yes, delete data"
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              clickHandler={() => {}}
              triggerClassName="flex cursor-pointer items-center text-grayHeading hover:text-dangerDark"
            >
              <Tooltip content="Delete" asChild>
                <span>
                  <DeleteSvg className="h-6" />
                </span>
              </Tooltip>
            </AlertDialog>
          </div>
        ),
      }),
    ],
    []
  );

  return (
    <section>
      {(!isLoading || !isError) && (
        <div className="mb-4 flex justify-between">
          {/* <SearchSelect
            className="w-72 text-[15px] shadow"
            options={[
              { value: 1, label: 'All Users' },
              { value: 2, label: 'Active Users' },
              { value: 3, label: 'Inactive Users' },
              { value: 4, label: 'Free Signup (Never Subscribed)' },
            ]}
            defaultValue={{ value: 1, label: 'All Users' }}
          /> */}
          <div className="flex gap-4">
            <TableFilters
              sortOptions={["Name", "Email", "User Date", "Active Status"]}
            />
            <Search placeholder="Search Users" classname="shadow w-[316px]" />
          </div>
        </div>
      )}
      {data?.results && (
        <Table
          data={data.results}
          columns={columns}
          isError={isError}
          isLoading={isLoading}
          totalEntries={data.count}
          containsActions
          showFooter
        />
      )}
    </section>
  );
}

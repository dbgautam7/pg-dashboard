import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import Table from "../Shared/Table";
import { EditSvg } from "../../icons/AllSvgs";
import Search from "../Shared/Search";
import UserFormModal from "./UserFormModal";
import TableFilters from "../Shared/TableFilters";
import LoadingSvg from "../../assets/loading.svg";
import { useToggleUserStatus, useUsersData } from "../../hooks/useQueryData";
import { IUserData } from "../../types";
import Error from "../Shared/Error";
import Switch from "../UI/Switch";
import Tooltip from "../UI/Tooltip";
import { useUpdateProfileMutation } from "../../hooks/useMutateData";
import { SubmitHandler } from "react-hook-form";
import { useToast } from "../../contexts/ToastContext";
import debounce from "../../utils/debounce";

const columnHelper = createColumnHelper<IUserData>();

export default function UserTable() {
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>();
  const { data, isLoading, isError, refetch } = useUsersData({
    page,
    username: searchValue,
  });

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchValue(value), 100, true),
    []
  );

  const { updateToast } = useToast();
  useToggleUserStatus(selectedId);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Id",
      }),
      columnHelper.accessor("current_role_id", {
        header: "Role",
        id: "current_role_id",
        cell: ({ row }) => {
          return (
            <p>
              {row.original.current_role_id === 1 ? "Super Admin" : "Admin"}
            </p>
          );
        },
      }),
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        id: "status",
        cell: ({ row }) => {
          return (
            <Switch
              key={row.original.id}
              active={row.original.status === "active" ? true : false}
              changeHandler={() => {
                setSelectedId(row.original.id);
              }}
            />
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <div
              className="flex items-start gap-4"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(row.original.id);
              }}
            >
              <UserFormModal
                isEdit={true}
                data={row?.original}
                handleUpdate={handleUpdateUser}
                triggerClassName="cursor-pointer text-grayHeading hover:text-primary"
              >
                <Tooltip content="Edit" asChild>
                  <span>
                    <EditSvg className="h-6" />
                  </span>
                </Tooltip>
              </UserFormModal>
            </div>
          );
        },
      }),
    ],
    []
  );

  const updateProfileMutation = useUpdateProfileMutation(selectedId);

  const handleUpdateUser: SubmitHandler<IUserData> = async (data) => {
    await updateProfileMutation.mutateAsync(["put", "", data], {
      onSuccess: (res) => {
        refetch();
        updateToast(res?.message, "success");
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.error
          ? error?.response?.data?.error
          : error.message;
        updateToast(errorMessage, "error");
      },
    });
  };

  return (
    <section>
      <div className="mb-4 flex justify-between">
        <div className="flex gap-4 flex-row-reverse justify-between w-full">
          {/* <TableFilters
            sortOptions={[
              { value: "name", label: "Name" },
              { value: "email", label: "Email" },
            ]}
          /> */}

          <Search
            placeholder="Search Users"
            className="shadow w-[316px]"
            searchValue={searchValue}
            searchHandler={(value) => debouncedSearch(value)}
          />
        </div>
      </div>
      {isLoading ? (
        <img
          src={LoadingSvg}
          className="mx-auto mt-4 h-28"
          alt="Loading Spinner"
        />
      ) : isError ? (
        <Error />
      ) : (
        <Table
          data={data?.data}
          columns={columns || []}
          isError={isError}
          isLoading={isLoading}
          totalEntries={data?.totalPages}
          containsActions
          currentPage={data?.currentPage || 1}
          showFooter
          pageChangeHandler={(page) => setPage(page)}
        />
      )}
    </section>
  );
}

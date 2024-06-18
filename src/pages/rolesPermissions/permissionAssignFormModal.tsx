import * as Dialog from "@radix-ui/react-dialog";
import SubHeading from "../../components/Shared/SubHeading";
import { IPermissions, TypeCheckedPermissions } from "../../types";
import Checkbox from "../../components/UI/Checkbox";
type HandleCheckBoxChange = (roleId: number, permissionId: number) => void;

interface Props {
  data?: IPermissions[];
  children: React.ReactNode;
  triggerClassName?: string;
  handleAssign: (roleId: number) => void;
  isModalOpen?: boolean;
  setIsModalOpen?: (d: boolean) => void;
  checkedPermissions: TypeCheckedPermissions;
  roleId: number;
  handleCheckBoxChange: HandleCheckBoxChange;
  hasPermissions: boolean;
}

export default function RolesPermissionsFormModal({
  data,
  children,
  triggerClassName = "",
  handleAssign,
  isModalOpen,
  setIsModalOpen,
  checkedPermissions,
  roleId,
  handleCheckBoxChange,
  hasPermissions,
}: Props) {
  console.log(data, "data=====32");
  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger className={triggerClassName}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content px-8 py-6">
          <aside className="space-y-8">
            <Dialog.Title>
              <SubHeading
                title={
                  hasPermissions ? "Update Permissions" : "Assign Permissions"
                }
              />
            </Dialog.Title>
            <section className="ml-6 space-y-8">
              {data?.map((permission: IPermissions) => {
                return (
                  <Checkbox
                    key={permission?.id}
                    label={permission?.name}
                    value={permission?.id?.toString() || ""}
                    checked={checkedPermissions?.[roleId]?.includes(
                      permission?.id
                    )}
                    handleChange={() =>
                      handleCheckBoxChange(roleId, permission?.id)
                    }
                  />
                );
              })}
            </section>
            <div className="flex justify-end gap-8">
              <button
                onClick={() => {
                  handleAssign(roleId);
                }}
                type="submit"
                className="btn-primary px-6"
              >
                {hasPermissions ? `Update  Permission` : `Assign   Permission`}
              </button>
              <Dialog.Close className="btn-danger px-6 py-2">
                Cancel
              </Dialog.Close>
            </div>
          </aside>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

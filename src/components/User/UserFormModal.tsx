import * as Dialog from "@radix-ui/react-dialog";
import { Row } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { UserType } from "../../types";
import SubHeading from "../Shared/SubHeading";

import InputField from "../UI/InputField";

interface Props {
  data?: Row<UserType>;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;
  handleCreate?: (d: any) => void;
  handleUpdate?: (d: any) => void;
}

export default function UserFormModal({
  data,
  children,
  triggerClassName = "",
  isEdit = false,
  handleCreate,
  handleUpdate,
}: Props) {
  const { register, handleSubmit } = useForm<UserType>(
    isEdit
      ? {
          defaultValues: {
            idx: data?.original.idx,
            firstName: data?.original.firstName,
            lastName: data?.original.lastName,
            email: data?.original.email,
            phone: data?.original.phone,
          },
        }
      : {}
  );

  return (
    <form onSubmit={handleSubmit(!isEdit ? handleCreate! : handleUpdate!)}>
      <Dialog.Root>
        <Dialog.Trigger className={triggerClassName}>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="overlay" />
          <Dialog.Content className="modal-content px-8 py-6">
            <form className="space-y-8">
              <Dialog.Title>
                <SubHeading title={isEdit ? "Create User" : "Update User"} />
              </Dialog.Title>
              <article className="flex gap-6">
                {/* <ImageInput className="h" /> */}
                <div className="basis-1/2 space-y-6">
                  <InputField
                    label="First Name"
                    placeholder="Enter first name of the user"
                    name="firstName"
                    // defaultValue={isEdit && data &&  data.original.firstName}
                    register={register}
                  />
                  <InputField
                    label="Last Name"
                    placeholder="Enter last name of the user"
                    register={register}
                    name="lastName"
                  />
                  <InputField
                    label="Email"
                    placeholder="Enter email of the user"
                    type="email"
                    name="email"
                    register={register}
                    disabled={isEdit}
                  />
                </div>
                <div className="basis-1/2 space-y-6">
                  <InputField
                    label="Phone"
                    placeholder="Enter phone of the user"
                    type="number"
                    name="phone"
                    register={register}
                    disabled={isEdit}
                  />
                  <InputField
                    label="Password"
                    placeholder="Enter password of the account"
                    type="password"
                    name="password"
                    register={register}
                    disabled={isEdit}
                  />

                  <InputField
                    placeholder="Role"
                    type="select"
                    label="Role"
                    options={[
                      "Super Dashboard Admin",
                      "Super Dashboard Manager",
                    ]}
                    name="role"
                    register={register}
                  />

                  {/* <InputField
                  label="Role"
                  placeholder="Enter password of the account"
                  type="password"
                  name="password"
                  register={register}
                  disabled={isEdit}
                /> */}
                </div>
              </article>

              <div className="flex justify-end gap-8">
                <button type="submit" className="btn-primary px-6">
                  {!isEdit ? "Create User" : "Update User"}
                </button>
                <Dialog.Close className="btn-danger px-6 py-2">
                  Cancel
                </Dialog.Close>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </form>
  );
}

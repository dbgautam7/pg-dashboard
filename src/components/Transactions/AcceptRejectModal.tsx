import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { IUserData } from "../../types";
import SubHeading from "../Shared/SubHeading";
import InputField from "../UI/InputField";

interface Props {
  data?: IUserData;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;
  handleCreate?: (d: any) => void;
  handleUpdate?: (d: any) => void;
  isModalOpen?: boolean;
  setIsModalOpen?: (d: boolean) => void;
}

export default function TransactionAcceptRejectModal({
  data,
  children,
  triggerClassName = "",
  isEdit = false,
  handleCreate,
  handleUpdate,
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const { register, handleSubmit } = useForm<{ remarks: string }>();

  const handleAcceptReject = () => {
    //
  };
  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger className={triggerClassName}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content px-8 py-6">
          <form
            onSubmit={handleSubmit(handleAcceptReject)}
            className="space-y-8"
          >
            <Dialog.Title>
              <SubHeading title={isEdit ? "Accept" : "Reject"} />
            </Dialog.Title>
            <section className="flex-grow space-y-6">
              <div className="flex gap-6">
                <InputField
                  {...register("remarks")}
                  label="Full Name"
                  name="name"
                  placeholder="Full Name"
                  defaultValue={data?.name}
                />
              </div>
            </section>
            <div className="flex justify-end gap-8">
              <button type="submit" className="btn-primary px-6">
                {isEdit ? "Accept" : "Reject"}
              </button>
              <Dialog.Close className="btn-danger px-6 py-2">
                Cancel
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

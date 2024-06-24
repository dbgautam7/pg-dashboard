import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import SubHeading from "../Shared/SubHeading";
import InputField from "../UI/InputField";

interface Props {
  action?: string;
  isModalOpen?: boolean;
  setIsModalOpen?: (d: boolean) => void;
  handleAcceptOrReject?: (d: any) => void;
}

export default function TransactionAcceptRejectModal({
  action = "",
  isModalOpen,
  setIsModalOpen,
  handleAcceptOrReject,
}: Props) {
  const { register, handleSubmit } = useForm<{ remarks: string }>();

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content px-8 py-6">
          <form
            onSubmit={handleSubmit(handleAcceptOrReject!)}
            className="space-y-8"
          >
            <Dialog.Title>
              <SubHeading title={action === "success" ? "Accept" : "Reject"} />
            </Dialog.Title>
            <section className="flex-grow space-y-6">
              <div className="flex gap-6">
                <InputField
                  {...register("remarks")}
                  label="Remarks"
                  name="remarks"
                  placeholder="Remarks"
                />
              </div>
            </section>
            <div className="flex justify-end gap-8">
              <button type="submit" className="btn-primary px-6">
                {action === "success" ? "Accept" : "Reject"}
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

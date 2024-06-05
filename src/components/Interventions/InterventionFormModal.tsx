import * as Dialog from "@radix-ui/react-dialog";

import SubHeading from "../Shared/SubHeading";
import InputField from "../UI/InputField";
import SearchSelectField from "../UI/SearchSelectField";

interface Props {
  children: React.ReactNode;
  triggerClassName?: string;
  formType?: "create" | "edit";
}

export default function InterventionFormModal({
  children,
  triggerClassName = "",
  formType = "create",
}: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={triggerClassName}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content space-y-8 px-8 py-6">
          <Dialog.Title>
            <SubHeading
              title={
                formType === "create"
                  ? "Create Intervention"
                  : "Update Intervention"
              }
            />
          </Dialog.Title>
          <article className="flex gap-6">
            <div className="basis-1/2 space-y-6">
              <SearchSelectField
                label="Plan Group"
                placeholder="Select group of the plan"
                options={[
                  { label: "GYM", value: 1 },
                  { label: "Sports", value: 2 },
                ]}
              />
              <InputField
                label="Intervention Duration (Days)"
                placeholder="Enter duration of the membership"
                type="number"
                name="tenure"
              />
            </div>
            <div className="basis-1/2 space-y-6">
              <InputField
                label="Intervention Name"
                placeholder="Enter name of the membership"
                name="name"
              />
              <InputField
                label="Amount (NPR)"
                placeholder="Enter cost of the membership"
                type="number"
                name="amount"
              />
            </div>
          </article>

          <div className="flex justify-end gap-8">
            <button type="submit" className="btn-primary px-6">
              {formType === "create"
                ? "Create Intervention"
                : "Update Intervention"}
            </button>
            <Dialog.Close className="btn-danger px-6 py-2">Cancel</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

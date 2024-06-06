import * as Alert from "@radix-ui/react-alert-dialog";

interface Props {
  clickHandler: () => void;
  children: React.ReactNode;
  description: string;
  btnText: string;
  closeHandler?: () => void;
  triggerClassName?: string;
}

const AlertDialog = ({
  btnText,
  children,
  clickHandler,
  description,
  closeHandler = () => undefined,
  triggerClassName = "",
}: Props) => (
  <Alert.Root onOpenChange={(open) => open === false && closeHandler()}>
    <Alert.Trigger className={`w-full ${triggerClassName}`}>
      {children}
    </Alert.Trigger>
    <Alert.Portal>
      <Alert.Overlay className="overlay" />
      <Alert.Content className="modal-content flex max-w-md flex-col gap-5 py-5 px-7">
        <Alert.Title className="text-lg font-medium">
          Are you absolutely sure?
        </Alert.Title>
        <Alert.Description className="text-[15px] text-grayText">
          {description}
        </Alert.Description>
        <div className="flex gap-8 self-end">
          <Alert.Action className="btn-danger px-4 py-2" onClick={clickHandler}>
            {btnText}
          </Alert.Action>
          <Alert.Cancel className="btn-primary px-4 py-2 font-medium shadow">
            Cancel
          </Alert.Cancel>
        </div>
      </Alert.Content>
    </Alert.Portal>
  </Alert.Root>
);

export default AlertDialog;

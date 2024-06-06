import { useForm, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../../hooks/useMutateData";
import TextField from "../../components/UI/TextField";
import { useToast } from "../../contexts/ToastContext";
interface IInputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInputs>();

  const changePasswordMutation = useChangePasswordMutation();
  const { updateToast } = useToast();

  const onSubmitHandler: SubmitHandler<IInputs> = async (data) => {
    delete data.confirmNewPassword;

    await changePasswordMutation.mutateAsync(["post", "", data], {
      onSuccess: (res) => {
        updateToast(res.message, "success");
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
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-8 rounded bg-white py-6 px-8 shadow"
    >
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6 flex-wrap">
        <TextField
          {...register("currentPassword", {
            required: "Current Password is required",
          })}
          placeholder="Old password"
          type="password"
          name="currentPassword"
          errorMessage={errors.currentPassword?.message}
        />
        <TextField
          {...register("newPassword", {
            required: "New Password is required",
          })}
          placeholder="New password"
          type="password"
          errorMessage={errors.newPassword?.message}
        />
        <TextField
          {...register("confirmNewPassword", {
            required: "Confirm Password is required",
            validate: (val: string | undefined) => {
              if (typeof val === "string" && watch("newPassword") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
          placeholder="Confirm password"
          type="password"
          errorMessage={errors.confirmNewPassword?.message}
        />
      </section>
      <section className="flex justify-end gap-8">
        <button type="submit" className="btn-primary px-6 py-2">
          Change Password
        </button>
      </section>
    </form>
  );
};

export default ChangePassword;

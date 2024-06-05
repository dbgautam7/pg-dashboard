import InputField from "../../components/UI/InputField";
import { useForm, SubmitHandler } from "react-hook-form";
interface IInputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    console.log(data, "Data");
  };
  console.log(errors, "error");
  console.log(watch("currentPassword"), "wch");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded bg-white py-6 px-8 shadow"
    >
      <section className="flex gap-6 flex-wrap">
        {/* <input
          {...register("currentPassword", {
            required: "Current Password is required",
          })}
          //   label="Old Password"
          placeholder="Enter old password"
          type="password"
          name="currentPassword"
        /> */}
        <InputField
          {...register("currentPassword", {
            required: "Current Password is required",
          })}
          label="Old Password"
          placeholder="Enter old password"
          type="password"
          name="currentPassword"
        />
        <InputField
          {...register("newPassword", {
            required: "New Password is required",
          })}
          label="New Password"
          placeholder="Enter new password"
          type="password"
          name="newPassword"
        />
        <InputField
          {...register("confirmNewPassword", {
            required: "Confirm Password is required",
          })}
          label="Confirm Password"
          placeholder="Enter new password again"
          type="password"
          name="confirmNewPassword"
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

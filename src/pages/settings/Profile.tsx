import { SubmitHandler, useForm } from "react-hook-form";
import ImageInput from "../../components/UI/ImageInput";
import InputField from "../../components/UI/InputField";
import { useUserInfo } from "../../hooks/useQueryData";
import LoadingSvg from "../../assets/loading.svg";
import Error from "../../components/Shared/Error";
import { useUpdateProfileMutation } from "../../hooks/useMutateData";
import { useToast } from "../../contexts/ToastContext";
import { IUserData } from "../../types";

const Profile = () => {
  const { data, isLoading, isError, refetch } = useUserInfo();
  const updateProfileMutation = useUpdateProfileMutation(data?.id);
  const { updateToast } = useToast();
  const { register, handleSubmit } = useForm<IUserData>();

  const onSubmitHandler: SubmitHandler<IUserData> = async (data) => {
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
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-8 rounded bg-white py-6 px-8 shadow"
    >
      {isLoading ? (
        <img
          src={LoadingSvg}
          className="mx-auto mt-4 h-28"
          alt="Loading Spinner"
        />
      ) : isError ? (
        <Error />
      ) : (
        <>
          <article className="flex items-center gap-8">
            {/* <ImageInput className="h-56 basis-1/4" /> */}
            <section className="flex-grow space-y-6">
              <div className="flex gap-6">
                <InputField
                  {...register("name")}
                  label="Full Name"
                  name="name"
                  defaultValue={data?.name}
                  placeholder="Full Name"
                />
              </div>
              <div className="flex gap-6">
                <InputField
                  {...register("email")}
                  label="Email"
                  name="email"
                  type="email"
                  defaultValue={data?.email}
                  placeholder="Email Address"
                />
                <InputField
                  {...register("phone")}
                  label="Phone Number"
                  name="phone"
                  type="number"
                  defaultValue={data?.phone}
                  placeholder="Phone Number"
                />
              </div>
            </section>
          </article>
          <section className="flex justify-end gap-8">
            <button type="submit" className="btn-primary px-6 py-2">
              Update Profile
            </button>
          </section>
        </>
      )}
    </form>
  );
};

export default Profile;

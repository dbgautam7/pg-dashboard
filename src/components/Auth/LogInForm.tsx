import { EmailSvg, LockSvg, RightArrowSvg } from "../../icons/AllSvgs";
import TextField from "../UI/TextField";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { useAuth } from "../../contexts/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { setAuthDetails } from "../../utils/cookie";

type Inputs = {
  email: string;
  password: string;
};

export default function LogInForm() {
  const navigate = useNavigate();
  const { updateToast } = useToast();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user/login`,
        data
      );
      console.log(response, response?.status, "response");
      const resData = response?.data;
      if (resData) {
        setAuth({ token: resData.token });
        setAuthDetails({
          token: resData.token,
          user: {},
        });
        updateToast(resData.message, "success");
        navigate("/");
      } else {
        updateToast("No Server Response!", "error");
      }
    } catch (err) {
      let errorMsg = "";
      if (err?.response?.status === 401) errorMsg = err?.response?.data?.error;
      updateToast(errorMsg, "error");
    }
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <h1 className="mb-4 text-xl font-bold text-primary text-center">
        Welcome to PG Dashboard
      </h1>
      <form
        className="flex flex-col gap-4 min-w-72 sm:min-w-96 justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          type="text"
          placeholder="Email"
          Icon={EmailSvg}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          errorMessage={errors.email?.message}
        />
        <TextField
          type="password"
          placeholder="Password"
          Icon={LockSvg}
          {...register("password", { required: "Password is required" })}
          errorMessage={errors.password?.message}
        />
        <button type="submit" className="btn-primary relative py-3">
          <h2 className=" text-white">Login</h2>
          <RightArrowSvg className="absolute top-1/2 right-4 h-7 -translate-y-1/2" />
        </button>
      </form>
    </div>
  );
}

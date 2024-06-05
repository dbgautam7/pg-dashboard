import AuthFormLayout from "../../layouts/AuthFormLayout";
import TextField from "../UI/TextField";
import { EmailSvg } from "../../icons/AllSvgs";

import type { FormProps } from "./SignUpForm";

export default function ResetForm({ changeView, view, direction }: FormProps) {
  return (
    <AuthFormLayout changeView={changeView} view={view} direction={direction}>
      <TextField
        Icon={EmailSvg}
        type="email"
        placeholder="Email"
        name="email"
      />
    </AuthFormLayout>
  );
}

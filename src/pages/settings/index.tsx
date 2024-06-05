import { useState } from "react";

import Nav from "../../components/Shared/Nav";
import SubHeading from "../../components/Shared/SubHeading";
import ImageInput from "../../components/UI/ImageInput";
import InputField from "../../components/UI/InputField";
import PageWrapper from "../../layouts/PageWrapper";

import ChangePassword from "./ChangePassword";

export default function SettingsPage() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-primary">Settings</h1>
        <Nav
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          navTitles={["Personal Info", "Change Password"]}
        />
        <section className="space-y-8 rounded bg-white py-6 px-8 shadow">
          <SubHeading
            title={activeNav === 0 ? "Personal Information" : "Change Password"}
          />
          {activeNav === 0 ? (
            <article className="flex items-center gap-8">
              <ImageInput className="h-56 basis-1/4" />
              <section className="flex-grow space-y-6">
                <div className="flex gap-6">
                  <InputField
                    label="First Name"
                    name="first_name"
                    defaultValue="Rohan"
                  />
                  <InputField
                    label="Last Name"
                    name="last_name"
                    defaultValue="Shrestha"
                  />
                </div>
                <div className="flex gap-6">
                  <InputField
                    label="Email"
                    name="email"
                    defaultValue="shrestharohan039@gmail.com"
                    type="email"
                  />
                  <InputField
                    label="Phone Number"
                    name="phone_number"
                    defaultValue="9812345678"
                    type="number"
                  />
                </div>
              </section>
            </article>
          ) : activeNav === 1 ? (
            <ChangePassword />
          ) : null}
          {/* <div className="flex justify-end gap-8">
            <button type="submit" className="btn-primary px-6 py-2">
              Save Changes
            </button>
          </div> */}
        </section>
      </div>
    </PageWrapper>
  );
}

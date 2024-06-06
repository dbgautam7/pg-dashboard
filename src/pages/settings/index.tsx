import { useState } from "react";

import Nav from "../../components/Shared/Nav";
import SubHeading from "../../components/Shared/SubHeading";
import PageWrapper from "../../layouts/PageWrapper";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";

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
            <Profile />
          ) : activeNav === 1 ? (
            <ChangePassword />
          ) : null}
        </section>
      </div>
    </PageWrapper>
  );
}

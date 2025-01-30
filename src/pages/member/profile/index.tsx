import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { User } from "@/types/user.type";

import { useEffect, useState } from "react";

const ProfilePage = () => {
  return (
    <>
      <ProfileMemberView />
    </>
  );
};

export default ProfilePage;

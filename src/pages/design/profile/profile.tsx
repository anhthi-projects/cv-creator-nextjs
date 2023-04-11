import { FC } from "react";

import SVG from "react-inlinesvg";

import { SignInButton, Wrapper } from "./profile.styled";
import { ProfileProps } from "./profile.types";

const Profile: FC<ProfileProps> = ({ isLoggedIn }) => {
  /**
   * Render
   */

  const renderSignIn = () => {
    return <SignInButton>Sign In</SignInButton>;
  };

  const renderProfile = () => {
    return "Nguyen Anh Thi";
  };

  return <Wrapper>{isLoggedIn ? renderProfile() : renderSignIn()}</Wrapper>;
};

export default Profile;

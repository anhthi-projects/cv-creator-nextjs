import { useMemo } from "react";

import { IconProps } from "@src/components/content-editable";
import { SectionContent } from "@src/components/section-content";
import { Space } from "@src/styles/variables";

const Contact = () => {
  const contactIcon = useMemo<Record<string, IconProps>>(
    () => ({
      dateOfBirth: { iconName: "calendar.svg" },
      email: { iconName: "email.svg" },
      phone: { iconName: "phone.svg" },
      github: { iconName: "github.svg" },
      linkedIn: { iconName: "linkedin.svg" },
    }),
    []
  );

  return (
    <SectionContent
      title="Contact"
      marginTop={Space.px56}
      contents={[
        {
          key: "date-of-birth",
          placeholder: "Date of Birth",
          icon: contactIcon.dateOfBirth,
        },
        {
          key: "email",
          placeholder: "Email",
          icon: contactIcon.email,
        },
        {
          key: "phone",
          placeholder: "Phone",
          icon: contactIcon.phone,
        },
        {
          key: "github",
          placeholder: "Github",
          icon: contactIcon.github,
        },
        {
          key: "linkedin",
          placeholder: "Linkedin",
          icon: contactIcon.linkedIn,
        },
      ]}
    />
  );
};

export default Contact;

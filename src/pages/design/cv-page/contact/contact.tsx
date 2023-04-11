import { useMemo } from "react";

import ContentEditableEnhance from "@src/components/content-editable-enhance/content-editable-enhance";
import { ContentEditableIcon } from "@src/components/content-editable-enhance/content-editable-enhance.types";
import Section from "@src/components/section/section";
import { Space } from "@src/styles/variables";

const Contact = () => {
  const dateOfBirthIcon = useMemo<ContentEditableIcon>(
    () => ({ iconName: "calendar.svg" }),
    []
  );
  const emailIcon = useMemo<ContentEditableIcon>(
    () => ({ iconName: "email.svg" }),
    []
  );
  const phoneIcon = useMemo<ContentEditableIcon>(
    () => ({ iconName: "phone.svg" }),
    []
  );
  const githubIcon = useMemo<ContentEditableIcon>(
    () => ({ iconName: "github.svg" }),
    []
  );
  const linkedinIcon = useMemo<ContentEditableIcon>(
    () => ({ iconName: "linkedin.svg" }),
    []
  );

  return (
    <Section
      title="Contact"
      marginTop={Space.px56}
      content={
        <>
          <ContentEditableEnhance
            placeholder="Date of Birth"
            icon={dateOfBirthIcon}
          />
          <ContentEditableEnhance placeholder="Email" icon={emailIcon} />
          <ContentEditableEnhance placeholder="Phone" icon={phoneIcon} />
          <ContentEditableEnhance placeholder="Github" icon={githubIcon} />
          <ContentEditableEnhance placeholder="Linkedin" icon={linkedinIcon} />
        </>
      }
    />
  );
};

export default Contact;

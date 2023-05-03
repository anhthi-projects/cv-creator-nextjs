import { SectionContent } from "@src/components/section-content";
import { Space } from "@src/styles/variables";

const AboutMe = () => {
  return (
    <SectionContent
      title="About Me"
      marginTop={Space.px56}
      contents={[
        {
          key: "about-me",
          content: `<span>Integrity, Emotion, </span><strong><em><span>Innovation</span></em></strong><span>, and Giving. Links are found in nearly all web pages. Links allow users to click their way from page to page</span>`,
        },
      ]}
    />
  );
};

export default AboutMe;

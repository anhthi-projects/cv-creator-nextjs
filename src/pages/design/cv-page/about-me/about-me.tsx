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
          content: `<a href="https://google.com" target="_blank">hello</a> <strong id="cn-1"> world </strong>Integrity, Emotion, Innovation, and Giving<em id="cn-7"> end</em>`,
        },
      ]}
    />
  );
};

export default AboutMe;

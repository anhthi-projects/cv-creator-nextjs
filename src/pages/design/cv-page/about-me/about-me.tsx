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
          content: `<a href="https://google.com" target="_blank">hello</a><strong> world </strong>Integrity, Emotion, Innovation, and Giving<em id="cn-7"> end</em>. Links are found in nearly all web pages. Links allow users to click their way from page to page. HTML Links - Hyperlinks.`,
        },
      ]}
    />
  );
};

export default AboutMe;

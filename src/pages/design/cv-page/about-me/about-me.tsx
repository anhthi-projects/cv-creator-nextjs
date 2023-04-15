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
          text: "Integrity, Emotion, Innovation, and Giving are four key lifestyles I always chase. I'm Thi Nguyen, a senior developer who has 5+ years of experience in software development. To me, every line of code must be optimized, maintainable, and easy to scale. I believe we're not only developers, we're also owners of products who understand and bring solutions to solve customer's problem",
        },
      ]}
    />
  );
};

export default AboutMe;

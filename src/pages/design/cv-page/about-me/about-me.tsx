import ContentEditable from "@src/components/content-editable/content-editable";
import Section from "@src/components/section/section";
import { Space } from "@src/styles/variables";

const AboutMe = () => {
  return (
    <Section
      title="About Me"
      marginTop={Space.px56}
      content={
        <ContentEditable
          text="Integrity, Emotion, Innovation, and Giving are four key lifestyles I always chase. I'm Thi Nguyen, a senior developer who has 5+ years of experience in software development. To me, every line of code must be optimized, maintainable, and easy to scale. I believe we're not only developers, we're also owners of products who understand and bring solutions to solve customer's problems"
          placeholder="Share something about yourself"
          textAlign="justify"
        />
      }
    />
  );
};

export default AboutMe;

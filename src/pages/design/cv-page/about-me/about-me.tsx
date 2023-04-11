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
          text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
          placeholder="Share something about yourself"
          textAlign="justify"
        />
      }
    />
  );
};

export default AboutMe;

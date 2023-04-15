import { SectionContent } from "@src/components/section-content";
import { Space } from "@src/styles/variables";

const Education = () => {
  return (
    <SectionContent
      title="Education"
      marginTop={Space.px56}
      contents={[
        {
          key: "asd",
          text: "- Got a Profession Bachelor of Computer Technology from AeU University",
        },
      ]}
    />
  );
};

export default Education;

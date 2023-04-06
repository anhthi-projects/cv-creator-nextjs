import { ChangeEvent, FC, useState } from "react";

import { useInOutsideClick } from "@src/hooks/useInOutsideClick";

import { EditableTextProps, Mode } from "./editable-text.types";
import { EditableWrapper } from "./editable.styled";

const EditableText: FC<EditableTextProps> = ({ initText }) => {
  const [mode, setMode] = useState(Mode.TEXT);
  const [text, setText] = useState(initText);

  const changeToText = () => setMode(Mode.TEXT);
  const changeToInput = () => setMode(Mode.INPUT);

  const wrapperRef = useInOutsideClick<HTMLInputElement>({
    insideCallback: changeToInput,
    outsideCallback: changeToText,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <EditableWrapper ref={wrapperRef}>
      {mode === Mode.TEXT ? (
        text
      ) : (
        <input value={text} onChange={handleInputChange} autoFocus />
      )}
    </EditableWrapper>
  );
};

export default EditableText;

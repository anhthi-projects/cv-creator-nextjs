import { ChangeEvent, FC, useState } from "react";

import { useInOutsideClick } from "@src/hooks/useInOutsideClick";
import { Color, FontSize, FontWeight } from "@src/styles/variables";

import { EditableTextProps, Mode } from "./editable-text.types";
import { EditableWrapper } from "./editable.styled";

const EditableText: FC<EditableTextProps> = (props) => {
  const {
    text: initText,
    placeholder,
    fontSize = FontSize.Xxl,
    fontWeight = FontWeight.Bold,
    color = Color.Blue,
  } = props;
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

  const renderDisplayType = () => {
    if (mode === Mode.TEXT) {
      return text || placeholder;
    }

    return (
      <input
        value={text}
        placeholder={placeholder}
        onChange={handleInputChange}
        autoFocus
      />
    );
  };

  return (
    <EditableWrapper
      text={text}
      placeholder={placeholder}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      ref={wrapperRef}
    >
      {renderDisplayType()}
    </EditableWrapper>
  );
};

export default EditableText;

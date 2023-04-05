import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

import styles from "./editable-text.module.scss";
import { EditableTextProps, Mode } from "./editable-text.types";

const EditableText: FC<EditableTextProps> = ({ initText }) => {
  const [mode, setMode] = useState(Mode.TEXT);
  const [text, setText] = useState(initText);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        setMode(Mode.INPUT);
      } else {
        setMode(Mode.TEXT);
      }
    };

    const handleKeyDown = (e: any) => {
      if (e.keyCode === 13) {
        setMode(Mode.TEXT);
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  /**
   * Render
   */

  const renderType = () => {
    if (mode === Mode.TEXT) {
      return text;
    }

    return <input value={text} onChange={handleInputChange} autoFocus />;
  };

  return (
    <div ref={wrapperRef} className={styles["editable-wrapper"]}>
      {renderType()}
    </div>
  );
};

export default EditableText;

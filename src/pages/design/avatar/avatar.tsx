import { ChangeEvent, useState } from "react";

import cx from "classnames";
import Image from "next/image";

import styles from "./avatar.module.scss";

const Avatar = () => {
  const [base64Photo, setBase64Photo] = useState("");

  const handlePhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || (e.target.files || []).length === 0) {
      return;
    }

    const rawPhoto = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(rawPhoto);

    fileReader.addEventListener("load", () => {
      const base64Photo = fileReader.result as string;

      if (!base64Photo.startsWith("data:image/")) {
        alert("Invalid file type");
        return;
      }

      setBase64Photo(base64Photo);
    });
  };

  const renderPreviewPhoto = () => {
    if (!base64Photo) {
      return null;
    }

    return (
      <div
        className={styles["preview-photo"]}
        style={{ backgroundImage: `url(${base64Photo})` }}
      />
    );
  };

  const renderFileUploader = () => {
    return (
      <label
        htmlFor="file-uploader"
        className={cx(styles["file-uploader"], {
          [styles.hidden]: base64Photo,
        })}
      >
        <Image
          width={32}
          height={32}
          src="/static/icons/camera.svg"
          alt="Select your photo"
        />
        <span className={styles["select-your-photo"]}>Select your photo</span>
        <input
          id="file-uploader"
          type="file"
          accept="image/*"
          onChange={handlePhotoSelect}
          className={styles["input-file"]}
        />
      </label>
    );
  };

  return (
    <div className={styles["avatar-wrapper"]}>
      {renderPreviewPhoto()}
      {renderFileUploader()}
    </div>
  );
};

export default Avatar;

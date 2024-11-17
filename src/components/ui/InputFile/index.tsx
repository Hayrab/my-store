import { Dispatch, SetStateAction } from "react";
import styles from "./InputFile.module.scss";

type PropsTypes = {
  name: string;
  uploadedImage: File | null;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

const InputFile = (props: PropsTypes) => {
  const { uploadedImage, setUploadedImage, name } = props;

  return (
    <div className={styles.file}>
      <label className={styles.file__label} htmlFor={name}>
        {uploadedImage?.name ? (
          <p>{uploadedImage?.name}</p>
        ) : (
          <>
            <p>Upload a new file, Larger image will be resized automatically</p>
            <p>
              Maximum upload size is <b>1 MB</b>
            </p>
          </>
        )}
      </label>
      <input
        className={styles.file}
        type="file"
        name={name}
        id={name}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
      />
    </div>
  );
};

export default InputFile;

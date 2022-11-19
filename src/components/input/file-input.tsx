import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface Props {
  imageChanged: (file: any) => void;
}

export const FileInputPreview: React.FC<Props> = ({ imageChanged }) => {
  const defaultImage = "../../assets/images/user.jpg";
  const previewRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string | ArrayBuffer | null>(defaultImage);
  const [isSelected, setSelected] = useState(false);

  const ImageChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let files;

    imageChanged(e.target.files != null && e.target.files[0]);

    if (imageInputRef.current?.files !== null)
      files = imageInputRef.current?.files[0];

    if (files) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(files);

      fileReader.addEventListener("load", function () {
        const background = this.result;

        setFile(background);
        setSelected(true);
      });
    }
  };

  useEffect(() => {
    if (previewRef.current !== null)
      previewRef.current.style.backgroundImage = `url(` + file + `)`;
  }, [file]);

  return (
    <FileInputWrapper>
      <FileInput
        ref={imageInputRef}
        name="img"
        id="img"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={ImageChanged}
      />

      <PreviewArea htmlFor="img">
        <ImageView ref={previewRef}></ImageView>
        <SelectButton>{isSelected ? "Change" : "Add photo"}</SelectButton>
      </PreviewArea>
    </FileInputWrapper>
  );
};

const FileInputWrapper = styled.div``;

const FileInput = styled.input`
  display: none;
`;

const PreviewArea = styled.label`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageView = styled.div`
  width: 88px;
  height: 88px;

  border: 2px solid ${(props) => props.theme.grey};

  border-radius: 50%;

  background-color: ${(props) => props.theme.white};

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  margin-bottom: 4px;

  transition: all linear 0.3s;
`;

const SelectButton = styled.div`
  color: ${(props) => props.theme.orange};
  cursor: pointer;
`;

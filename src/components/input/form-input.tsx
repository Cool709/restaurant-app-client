import styled from "styled-components";

interface FormInputProps {
  icon?: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}

export const FormInput = ({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: FormInputProps) => {
  return (
    <FormInputWrapper>
      {icon && <IconBox>{icon}</IconBox>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </FormInputWrapper>
  );
};

const FormInputWrapper = styled.div`
  position: relative;
  min-width: 300px;

  padding: 0;

  height: 36px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;

  border: 1px solid ${(props) => props.theme.grey};
`;

const IconBox = styled.label`
  border: none;

  width: 30px;
  height: 30px;

  margin-left: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  border: none;
  outline: none;

  width: 100%;

  padding: 4px 8px;

  margin: 0;

  height: 28px;

  font-size: ${(props) => props.theme.base};
`;

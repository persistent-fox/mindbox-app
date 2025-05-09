import { DetailedHTMLProps, FC, InputHTMLAttributes, memo } from "react";
import styled, { css } from "styled-components";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TCheckboxProps = Omit<DefaultInputPropsType, "type"> & {
  label?: string;
  type?: "checkbox" | "radio";
};

export const Checkbox: FC<TCheckboxProps> = memo(
  ({ label, type = "checkbox", ...props }) => {
    return (
      <Label>
        <Input $variant={type} type={type} {...props} />
        <FakeCheckbox></FakeCheckbox>
        {label}
      </Label>
    );
  },
);

export const FakeCheckbox = styled.span`
  position: relative;
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.accent};
  padding: 2px;
  transition: all 0.3s;
  font-size: 25px;
  &:hover {
    border: 2px solid ${(props) => props.theme.colors.default};
  }
`;

export const Input = styled.input<TInputProps>`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  &:checked + ${FakeCheckbox}::after {
    content: url(/mindbox-app/arrow.svg);
    position: absolute;
    display: block;
    width: 18px;
    height: 18px;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
  ${(props) =>
    props.$variant === "radio" &&
    css`
      &:checked + ${FakeCheckbox}::after {
        content: "";
        display: block;
        width: 12px;
        height: 12px;
        background-color: ${(props) => props.theme.colors.accent};
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}
  &:disabled + ${FakeCheckbox} {
    cursor: default;
    opacity: 0.6;
    border-color: ${(props) => props.theme.colors.grey.medium};
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

//types
type TInputProps = {
  $variant: "checkbox" | "radio";
};

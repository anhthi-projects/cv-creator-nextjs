import styled from "styled-components";

export const EditableWrapper = styled.div`
  width: 100%;
  height: 30px;
  font-size: $font-md;
  display: flex;
  align-items: center;
  padding: 0 6px;

  input {
    border: none;
    outline: none;
    margin: 0 -6px;
    padding: 0 6px;
    background-color: #eff1f7;
    flex-grow: 1;
    align-self: stretch;
    font-size: $font-md;
    border-radius: 3px;
  }
`;

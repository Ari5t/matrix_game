import { MouseEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

interface ISelectOption {
  value: string;
  label: string;
}

function Select() {
  const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(options[0]);

  const [focus, setFocus] = useState(false);

  const handleOptionClick = (event: MouseEvent) => {
    setSelectedOption(() => {
      return (
        options.find(
          (option) => option.value === (event.target as HTMLElement).id
        ) ?? null
      );
    });
  };

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  return (
    <Wrapper tabIndex={0} onBlur={handleBlur} onFocus={handleFocus}>
      <SelectButton $isFocus={focus}>
        {selectedOption ? selectedOption['label'] : ''}
      </SelectButton>
      <List $isFocus={focus}>
        {options.map((option) => (
          <Option
            onClick={handleOptionClick}
            id={option.value}
            $isActive={option.value === selectedOption?.value}
            key={option.value}>
            {option.label}
          </Option>
        ))}
      </List>
    </Wrapper>
  );
}

export default Select;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  position: relative;
  margin: 8px;
`;

const SelectButton = styled.button<{ $isFocus: boolean }>`
  display: flex;
  align-items: center;

  background-color: #333333;
  border: ${(props) =>
    props.$isFocus ? '1px solid #fff' : '1px solid #444444'};
  color: #ffffff;
  border-radius: 12px;
  transition: background-color 0.3s;

  position: relative;

  font-size: 16px;
  padding: 8px 16px;
  width: 100%;

  cursor: pointer;

  &::after {
    content: ${(props) =>
      props.$isFocus
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%23dedede'%3E%3Cpath d='m280-400 200-200 200 200H280Z'/%3E%3C/svg%3E")`
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%23dedede'%3E%3Cpath d='M480-360 280-560h400L480-360Z'/%3E%3C/svg%3E")`};
    position: absolute;
    right: 4px;

    width: 24px;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    border-color: #979797;
  }
`;

const List = styled.ul<{ $isFocus: boolean }>`
  display: ${(props) => (props.$isFocus ? 'flex' : 'none')};
  flex-direction: column;

  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  z-index: 99;
  width: 100%;

  background-color: #333333;
  color: #ffffff;
  list-style-type: none;

  border-radius: 12px;
`;

const Option = styled.li<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  border-radius: 12px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #444444;
  }

  &::after {
    content: ${(props) =>
      props.$isActive
        ? `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="%23dedede"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>')`
        : 'none'};
    position: absolute;
    right: 8px;
  }
`;

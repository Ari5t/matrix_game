import { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

function Datepicker({ isRange }: { isRange?: true }) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <Wrapper>
      <DatePicker
        selectsRange={isRange}
        startDate={isRange ? startDate : undefined}
        endDate={isRange ? endDate : undefined}
        calendarStartDay={1}
        selected={!isRange ? startDate : undefined}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onChange={(date: [Date, Date] | Date) => {
          if (isRange) {
            const [start, end] = date as [Date, Date];
            setStartDate(start);
            setEndDate(end);
          } else {
            setStartDate(date as Date | null);
          }
        }}
      />
    </Wrapper>
  );
}

export default Datepicker;

const Wrapper = styled.div`
  /* width: 240px;

  .react-datepicker__input-container input {
    width: 240px;
    padding: 8px;
    border: none;
    border-radius: 12px;
    font-size: 16px;

    background-color: #333333;
    color: #ffffff;
  } */
`;

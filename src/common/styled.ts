import styled from 'styled-components';

import useConfigStore from '../store/config';

export const crystalColors = [
  '#ffb3ba',
  '#ffdfba',
  '#ffffba',
  '#baffc9',
  '#bae1ff',
];

export const Block = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(${useConfigStore.getState().config.cols}, 1fr);
  grid-template-rows: repeat(${useConfigStore.getState().config.rows}, 1fr);
`;

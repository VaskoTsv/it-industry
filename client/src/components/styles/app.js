import styled from 'styled-components';
import { calculateRem } from './utils.js';

export const __ApplicationContainer = styled.div`
     width: ${calculateRem(960)};
     margin: 0 auto;
     padding: ${calculateRem(20)};
`

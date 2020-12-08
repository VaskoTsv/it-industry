import styled from 'styled-components';
import { calculateRem } from './utils.js';

export const __FiltersContainer = styled.div`
    width: ${calculateRem(800)};
    margin: ${calculateRem(20)} auto;
    
    header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding-bottom: ${calculateRem(15)};
    
        h2 {
            margin: 0 ${calculateRem(10)} 0;
        }
        
        button.bp3-button {
            height: 32px;
        }
    }
    
    main {
        padding: ${calculateRem(15)} 0;
    }
`

export const __FiltersItem = styled.div`
    margin-right: ${calculateRem(15)} !important;
`

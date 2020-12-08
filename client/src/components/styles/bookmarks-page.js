import styled from 'styled-components';
import { _darkGray_, _lightGray_ } from './utils.js';

export const __BookmarksContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
`

export const __BookmarkInformation = styled.div`
    padding: 10px 15px;
    margin: 10px 20px 10px 0px;
    border: 1px solid ${_darkGray_};
    background-color: ${_lightGray_};
    border-radius: 5px;
    
    -webkit-box-shadow: 1px 1px 10px 0px rgba(50, 50, 50, 0.15);
    -moz-box-shadow:    1px 1px 10px 0px rgba(50, 50, 50, 0.15);
    box-shadow:         1px 1px 10px 0px rgba(50, 50, 50, 0.15);
`

import React from 'react';
import LoadingIndicator from './LoadingIndicator';

const LoadingButton = (props) => (
  <a href="#" className={`${props.className} btn btn--loading`} disabled="true">
    <LoadingIndicator />
  </a>
)

export default LoadingButton;

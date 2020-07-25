import { LoaderAlt } from '@styled-icons/boxicons-regular';
import * as React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingIconProps {
  size: number | string;
}

const spinAnimation = keyframes({
  from: {
    transform: `rotate(0deg)`,
  },
  to: {
    transform: `rotate(360deg)`,
  },
});

const LoadingIcon = styled(LoaderAlt)((props: LoadingIconProps) => ({
  width: props.size,
  height: props.size,
}));

type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;

type Props = GetComponentProps<typeof LoadingIcon>;

const LoadSpinner = (props: Props) => (
  <Rotator>
    <LoadingIcon {...props} />
  </Rotator>
);

const Rotator = styled.div`
  animation: ${spinAnimation} 0.5s linear infinite;
`;

export default LoadSpinner;

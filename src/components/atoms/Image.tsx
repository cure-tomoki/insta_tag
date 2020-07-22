import * as React from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const Image = (props: Props) => {
  return <img {...props} />;
};

export default Image;

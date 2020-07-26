import * as copy from 'copy-to-clipboard';
import * as React from 'react';

interface Options {
  successDuration?: number;
}

const useCopyClipboard = (
  text: string | null,
  options?: Options
): [boolean, () => void] => {
  const [isCopied, setIsCopied] = React.useState(false);
  const successDuration = options?.successDuration;

  React.useEffect(() => {
    if (isCopied && successDuration) {
      const id = setTimeout(() => {
        setIsCopied(false);
      }, successDuration);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isCopied, successDuration]);

  return [
    isCopied,
    () => {
      if (text === null) return;
      const didCopy = copy(text);
      setIsCopied(didCopy);
    },
  ];
};

export default useCopyClipboard;

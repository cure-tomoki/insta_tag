import * as React from 'react';

import * as EditorDuck from '~/ducks/EditorDuck';
import useRootContext from '~/hooks/useRootContext';

const validateCaptionText = (text: string) => {
  // TODO: impl
  return !!text;
};

const useCaptionTextGenerator = (): {
  captionText: string | null;
  isValid: boolean;
} => {
  const { state } = useRootContext();
  const { exifText } = EditorDuck.selectors.getText(state);

  const isValid = React.useMemo(() => {
    return validateCaptionText(exifText);
  }, [exifText]);

  return {
    captionText: exifText,
    isValid,
  };
};

export default useCaptionTextGenerator;

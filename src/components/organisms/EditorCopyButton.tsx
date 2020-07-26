import { Clipboard, Check } from '@styled-icons/boxicons-regular';
import * as React from 'react';
import styled from 'styled-components';

import useCaptionTextGenerator from '~/hooks/useCaptionTextGenerator';
import useCopyClipboard from '~/hooks/useClipboard';
import * as vars from '~/vars';

interface Props {
  className?: string;
}

const EditorCopyButton = ({ className }: Props) => {
  const { captionText, isValid } = useCaptionTextGenerator();

  const [isCopied, copy] = useCopyClipboard(captionText, {
    successDuration: 3000,
  });

  return (
    <Button
      className={className}
      disabled={!isValid || isCopied}
      onClick={copy}
    >
      {isCopied && (
        <CheckIcon aria-label="コピーしました" aria-hidden={false} />
      )}
      <ClipboardIcon aria-label="コピー" aria-hidden={isCopied} />
    </Button>
  );
};

const Button = styled.button(
  // @ts-ignore position property causing error
  ({ disabled = false }: { disabled?: boolean }) => ({
    position: 'relative',
    width: 24 + vars.spacing.normal,
    height: 24 + vars.spacing.normal,
    padding: 0,
    margin: `${vars.spacing.half}px ${vars.spacing.normal}px`,
    color: disabled ? vars.colors.silver : vars.colors.gray,
    border: 'none',
    background: 'none',
  })
);

const ClipboardIcon = styled(Clipboard)({
  position: 'absolute',
  top: 0,
  left: 0,
});

const CheckIcon = styled(Check)({
  position: 'absolute',
  top: 0,
  left: 0,
  color: vars.colors.lightGreen,
  margin: vars.spacing.half,
});

export default EditorCopyButton;

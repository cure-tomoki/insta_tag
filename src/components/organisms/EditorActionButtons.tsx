import * as React from 'react';
import styled from 'styled-components';

import InstaMockIcons from '~/components/atoms/InstaMockIcons';
import EditorCopyButton from '~/components/organisms/EditorCopyButton';
import * as vars from '~/vars';

const EditorActionButtons = () => {
  return (
    <Container>
      <ButtonSection>
        <MockButton>
          <InstaMockIcons type="like" size={24} fill={vars.colors.silver} />
        </MockButton>
        <MockButton>
          <InstaMockIcons type="comment" size={24} fill={vars.colors.silver} />
        </MockButton>
        <MockButton>
          <InstaMockIcons type="share" size={24} fill={vars.colors.silver} />
        </MockButton>
      </ButtonSection>

      <ButtonSection>
        <CopyButton />
      </ButtonSection>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: vars.spacing.half,
});

const ButtonSection = styled.div({
  display: 'flex',
});

const MockButton = styled.div({
  width: 24,
  height: 24,
  margin: vars.spacing.normal,
  '&:first-child': {
    marginLeft: 0,
  },
  '&:last-child': {
    marginRight: 0,
  },
});

const CopyButton = styled(EditorCopyButton)({
  width: 24 + vars.spacing.normal,
  height: 24 + vars.spacing.normal,
  '&:first-child': {
    marginLeft: 0,
  },
  '&:last-child': {
    marginRight: 0,
  },
});

export default EditorActionButtons;

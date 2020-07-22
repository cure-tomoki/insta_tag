import * as React from 'react';
import styled from 'styled-components';

import * as vars from '~/vars';

const EditorHeader = () => (
  <Container>
    <Image></Image>
    <Name>Instagen</Name>
  </Container>
);

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: vars.spacing.double,
});

const Image = styled.div({
  display: 'block',
  width: 32,
  height: 32,
  content: '',
  background: vars.colors.white,
  borderRadius: vars.radius.round,
  border: `.5px solid ${vars.colors.whitesmoke}`,
});

const Name = styled.span({
  fontSize: vars.fontSize.xs,
  fontWeight: 'bold',
  marginLeft: vars.spacing.double,
});

export default EditorHeader;

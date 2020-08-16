import * as React from 'react';
import styled from 'styled-components';

import * as vars from '~/vars';

interface Props {
  HeaderContent: React.ElementType;
  ImageAreaContent: React.ElementType;
  ActionButtonAreaContent: React.ElementType;
  CaptionAreaContent: React.ElementType;
}

const InstaMockTemplate = ({
  HeaderContent,
  ImageAreaContent,
  ActionButtonAreaContent,
  CaptionAreaContent,
}: Props) => {
  return (
    <Container>
      {/* header */}
      <HeaderArea>
        <HeaderContent />
      </HeaderArea>

      {/* image */}
      <ImageArea>
        <ImageAreaContent />
      </ImageArea>

      {/* caption */}
      <CaptionArea>
        <ActionButtonAreaContent />
        <CaptionAreaContent />
      </CaptionArea>
    </Container>
  );
};

const Container = styled.main({
  marginTop: vars.spacing.triple,
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.dimsilver}`,
  borderRadius: vars.radius.normal,
});

const HeaderArea = styled.header({
  padding: `0 ${vars.spacing.double}px`,
  borderBottom: `1px solid ${vars.colors.lightsilver}`,
});

const ImageArea = styled.div({
  borderBottom: `1px solid ${vars.colors.lightsilver}`,
});

const CaptionArea = styled.div({
  padding: `0 ${vars.spacing.double}px ${vars.spacing.double}px`,
});

export default InstaMockTemplate;

import * as React from 'react';
import styled from 'styled-components';

import * as vars from '~/vars';

interface Props {
  HeaderContent: React.ElementType;
  ImageAreaContent: React.ElementType;
  CaptionAreaContent: React.ElementType;
}

const InstaMockTemplate = ({
  HeaderContent,
  ImageAreaContent,
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
        <CaptionAreaContent />
      </CaptionArea>
    </Container>
  );
};

const Container = styled.article({
  marginTop: vars.spacing.triple,
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.dimsilver}`,
  borderRadius: vars.radius.normal,
});

const HeaderArea = styled.header({
  borderBottom: `1px solid ${vars.colors.lightsilver}`,
});

const ImageArea = styled.div({});

const CaptionArea = styled.div({});

export default InstaMockTemplate;

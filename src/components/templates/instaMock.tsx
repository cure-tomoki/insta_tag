import * as React from 'react';
import styled from 'styled-components';

import InstaMockIcons from '~/components/atoms/InstaMockIcons';
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
        <MockButtonContainer>
          <MockButtonSection>
            <MockButton>
              <InstaMockIcons type="like" size={24} fill={vars.colors.gray} />
            </MockButton>
            <MockButton>
              <InstaMockIcons
                type="comment"
                size={24}
                fill={vars.colors.gray}
              />
            </MockButton>
            <MockButton>
              <InstaMockIcons type="share" size={24} fill={vars.colors.gray} />
            </MockButton>
          </MockButtonSection>

          <MockButtonSection>
            <MockButton>
              <InstaMockIcons type="save" size={24} fill={vars.colors.gray} />
            </MockButton>
          </MockButtonSection>
        </MockButtonContainer>
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
  padding: `0 ${vars.spacing.double}px`,
  borderBottom: `1px solid ${vars.colors.lightsilver}`,
});

const ImageArea = styled.div({
  borderBottom: `1px solid ${vars.colors.lightsilver}`,
});

const CaptionArea = styled.div({
  padding: `0 ${vars.spacing.double}px ${vars.spacing.double}px`,
});

const MockButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: vars.spacing.half,
});

const MockButtonSection = styled.div({
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

export default InstaMockTemplate;

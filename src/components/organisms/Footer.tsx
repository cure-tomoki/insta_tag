import { Github } from '@styled-icons/boxicons-logos/Github';
import * as React from 'react';
import styled from 'styled-components';

import * as vars from '~/vars';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <_Footer>
      <span>
        <CopyRight>&#x24B8;</CopyRight>
        {`tomotetra ${year}`}
      </span>
      <RightContent>
        <IconLink href="https://github.com/tomotetra/insta_tag" target="_blank">
          <_Github aria-label="github" />
        </IconLink>
      </RightContent>
    </_Footer>
  );
};

const _Footer = styled.footer({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
  marginTop: vars.spacing.quadruple,
  padding: vars.spacing.double,
  fontSize: vars.fontSize.xxxs,
  color: vars.colors.gray,
  borderTop: `1px solid ${vars.colors.lightsilver}`,
});

const CopyRight = styled.span({
  fontSize: vars.fontSize.xxxs,
  marginRight: vars.spacing.half,
});

const RightContent = styled.div({
  display: 'flex',
  position: 'absolute',
  right: vars.spacing.double,
});

const IconLink = styled.a({
  color: vars.colors.darkBlue,
  width: vars.fontSize.xs,
  height: vars.fontSize.xs,
  '&:hover': {
    color: vars.colors.lightBlue,
  },
});

const _Github = styled(Github)({
  display: 'block',
  margin: 'auto',
});

export default Footer;

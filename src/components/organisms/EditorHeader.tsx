import * as React from 'react';
import styled from 'styled-components';

import { Context } from '~/context';
import * as EditorDuck from '~/ducks/EditorDuck';
import * as vars from '~/vars';

const EMOJI_LIST = [
  '😇',
  '😄',
  '😍',
  '😎',
  '🤪',
  '👻',
  '👽',
  '👾',
  '💩',
  '🤖',
  '🍆',
  '🥑',
  '🍎',
  '🍔',
  '🍣',
  '🏀',
  '⚽️',
  '🏈',
];
const randomEmoji = () =>
  EMOJI_LIST[Math.floor(Math.random() * EMOJI_LIST.length)];

const EditorHeader = () => {
  const { state } = React.useContext(Context);
  const file = EditorDuck.selectors.getImageFile(state);
  const { createdDate } = EditorDuck.selectors.getExifData(state);

  return (
    <Container>
      <Image>{randomEmoji()}</Image>
      <PhotoInfo>
        <Name>{file?.name ?? 'Instagen'}</Name>
        {createdDate && <CreatedDate>{createdDate}</CreatedDate>}
      </PhotoInfo>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: `${vars.spacing.double}px 0`,
});

const Image = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: vars.fontSize.m,
  width: 32,
  height: 32,
  content: '',
  padding: '0 0 2px 2px', // to center emoji in div
  background: vars.colors.whitesmoke,
  borderRadius: vars.radius.round,
  border: `.5px solid ${vars.colors.lightgray}`,
});

const PhotoInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: vars.spacing.double,
});

const Name = styled.span({
  fontSize: vars.fontSize.xxs,
  fontWeight: 'bold',
});

const CreatedDate = styled.span({
  fontSize: vars.fontSize.xxxs,
});

export default EditorHeader;

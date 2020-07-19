import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import EditorPage from '~/components/pages/Editor';
import { Provider } from '~/context';
import * as vars from '~/vars';

const App: React.FC = () => {
  // TODO: add router and stuff
  return (
    <>
      <BaseStyleApplier />

      {/* context provider */}
      <Provider>
        <PageContainer>
          <EditorPage />
        </PageContainer>
      </Provider>
    </>
  );
};

// extends reset css
const BaseStyleApplier = createGlobalStyle`
${reset}
body {
  font-size: ${vars.fontSize.xs};
  color: ${vars.colors.darkgray};
}
`;

const PageContainer = styled.div({
  position: 'relative',
  maxWidth: vars.MAX_PAGE_WIDTH,
  margin: '0 auto',
});

export default App;

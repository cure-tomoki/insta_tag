import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import Footer from '~/components/organisms/Footer';
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

      <Footer />
    </>
  );
};

// extends reset css
const BaseStyleApplier = createGlobalStyle`
${reset}
body {
  font-family: "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    Meiryo,
    sans-serif;
  font-size: ${vars.fontSize.xs};
  line-height: 1.5;
  color: ${vars.colors.darkgray};
  background-color: ${vars.colors.whitesmoke};
}
*:focus {
  outline: 2px solid ${vars.colors.lightBlue};
}
`;

const PageContainer = styled.div({
  position: 'relative',
  maxWidth: vars.MAX_PAGE_WIDTH,
  margin: '0 auto',
});

export default App;

import * as React from 'react';

import Editor from '~/components/pages/Editor';
import EditorProvider from '~/providers/editorProvider';

const EditorContainer: React.FC = () => {
  return (
    <EditorProvider>
      <Editor />
    </EditorProvider>
  );
};

export default EditorContainer;

import * as React from 'react';

import EditorCaptionEditor from '~/components/organisms/EditorCaptionEditor';
import EditorHeader from '~/components/organisms/EditorHeader';
import EditorImageDropZone from '~/components/organisms/EditorImageDropZone';
import InstaMockTemplate from '~/components/templates/instaMock';

const Editor = () => {
  return (
    <InstaMockTemplate
      HeaderContent={EditorHeader}
      ImageAreaContent={EditorImageDropZone}
      CaptionAreaContent={EditorCaptionEditor}
    />
  );
};

export default Editor;

import * as React from 'react';

import EditorHeader from '~/components/organisms/EditorHeader';
import EditorImageDropZone from '~/components/organisms/EditorImageDropZone';
import ExifDisplayZone from '~/components/organisms/ExifDisplayZone';
import InstaMockTemplate from '~/components/templates/instaMock';

const Editor = () => {
  return (
    <InstaMockTemplate
      HeaderContent={EditorHeader}
      ImageAreaContent={EditorImageDropZone}
      CaptionAreaContent={ExifDisplayZone}
    />
  );
};

export default Editor;

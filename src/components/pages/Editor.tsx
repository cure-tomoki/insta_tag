import * as React from 'react';

import EditorImageDropZone from '~/components/organisms/EditorImageDropZone';
import ExifDisplayZone from '~/components/organisms/ExifDisplayZone';

const Editor = () => {
  return (
    <>
      <EditorImageDropZone />
      <ExifDisplayZone />
    </>
  );
};

export default Editor;

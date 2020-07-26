import * as React from 'react';
import styled from 'styled-components';

import LoadSpinner from '~/components/atoms/LoadSpinner';
import ImageDropZone from '~/components/molecules/ImageDropZone';
import * as EditorDuck from '~/ducks/EditorDuck';
import useRootContext from '~/hooks/useRootContext';
import { assert } from '~/utils/commonUtils';
import {
  createImagePreviewURL,
  readExifData,
  generateExifText,
} from '~/utils/imageUtil';
import * as vars from '~/vars';

const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/heic'];

const EditorImageDropZone = () => {
  const { state, dispatch } = useRootContext();
  const { previewURL } = EditorDuck.selectors.getImage(state);

  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleImageDrop = <x extends File>(acceptedFiles: x[]) => {
    const acceptedFile = acceptedFiles[0]; // ignore rest :p
    try {
      (async () => {
        setIsProcessing(true);
        // preview image
        const url = await createImagePreviewURL(acceptedFile);
        assert(url !== null, 'could not create image preview url');
        dispatch(
          EditorDuck.actions.setImage({ file: acceptedFile, previewURL: url })
        );
        // exif data / text
        const exif = await readExifData(acceptedFile);
        const text = generateExifText(exif);
        dispatch(EditorDuck.actions.setExif({ data: exif, text }));

        setIsProcessing(false);
      })();
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <Container>
      <ImageDropZone
        onDrop={handleImageDrop}
        acceptedFileTypes={acceptedFileTypes}
        previewImageURL={previewURL}
        disabled={isProcessing}
      />
      {isProcessing && (
        <ProcessingOverlay>
          <LoadSpinner aria-hidden={true} size={32} />
          <ProcessingText>処理中</ProcessingText>
        </ProcessingOverlay>
      )}
    </Container>
  );
};

const Container = styled.div({
  position: 'relative',
});

const ProcessingOverlay = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  color: vars.colors.white,
  backgroundColor: `${vars.colors.black}80`,
});

const ProcessingText = styled.span({
  fontSize: vars.fontSize.s,
  fontWeight: 'bold',
  marginLeft: vars.spacing.normal,
});

export default EditorImageDropZone;

import { Camera } from '@styled-icons/boxicons-solid';
import * as isEmpty from 'lodash/isEmpty';
import * as React from 'react';
import styled from 'styled-components';

import * as EditorDuck from '~/ducks/EditorDuck';
import useRootContext from '~/hooks/useRootContext';
import * as vars from '~/vars';

const renderGearSection = (sectionName: string, value: string | undefined) => (
  <GearSection>
    <GearSectionName>{sectionName}</GearSectionName>
    {value === undefined ? (
      <GearSectionValue grayout>取得できません</GearSectionValue>
    ) : (
      <GearSectionValue>{value}</GearSectionValue>
    )}
  </GearSection>
);

const renderSettingsListItem = (
  sectionName: string,
  value: string | undefined
) => (
  <SettingsListItem>
    {/* TODO: icon */}
    <SettingField>
      <SettingFieldName>{sectionName}</SettingFieldName>
      {value === undefined ? (
        <SettingFieldValue grayout>取得できません</SettingFieldValue>
      ) : (
        <SettingFieldValue>{value}</SettingFieldValue>
      )}
    </SettingField>
  </SettingsListItem>
);

const ExifDisplayZone = () => {
  const { state } = useRootContext();
  const exifData = EditorDuck.selectors.getExifData(state);

  const camera = exifData.camera?.makeModel;
  const lens = exifData.lens?.makeModel;

  if (isEmpty(exifData)) {
    return null;
  }
  return (
    <Container>
      {/* equipments information */}
      <Gear>
        <CameraIconContainer>
          <CameraIcon />
        </CameraIconContainer>
        <GearSections>
          {renderGearSection('CAMERA', camera)}
          {renderGearSection('LENS', lens)}
        </GearSections>
      </Gear>
      {/* shot settings information */}

      <SettingsList>
        {renderSettingsListItem('FOCAL LENGTH', exifData.settings?.focalLength)}
        {renderSettingsListItem('APERTURE', exifData.settings?.fNumber)}
        {renderSettingsListItem('ISO', exifData.settings?.iso)}
        {renderSettingsListItem(
          'SHUTTER SPEED',
          exifData.settings?.shutterSpeed
        )}
      </SettingsList>
    </Container>
  );
};

const Container = styled.section({
  margin: vars.spacing.normal,
  padding: vars.spacing.double,
  borderRadius: vars.radius.double,
  background: vars.colors.lightsilver,
});

const Gear = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: vars.spacing.double,
  borderBottom: `1px solid ${vars.colors.silver}`,
});

const CameraIconContainer = styled.div({
  width: 32,
  height: 32,
  padding: vars.spacing.double,
  borderRadius: vars.radius.round,
  backgroundColor: vars.colors.lightgray,
  flexShrink: 0,
});

const CameraIcon = styled(Camera)({
  color: vars.colors.white,
});

const GearSections = styled.div({
  marginLeft: vars.spacing.double,
});

const GearSection = styled.div({
  marginBottom: vars.spacing.normal,
});

const GearSectionName = styled.span({
  marginBottom: vars.spacing.half,
  fontSize: vars.fontSize.xxs,
  fontWeight: 'bold',
});

const GearSectionValue = styled.p<{ grayout?: boolean }>((props) => ({
  fontSize: vars.fontSize.xs,
  fontFamily: vars.fontFamily.monospaced,
  ...(props.grayout && {
    color: vars.colors.darksilver,
  }),
}));

const SettingsList = styled.ul({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: vars.spacing.half,
});

const SettingsListItem = styled.li({
  display: 'flex',
  alignItems: 'center',
  marginBottom: vars.spacing.half,
  listStyle: 'none',
});

const SettingField = styled.span({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: vars.spacing.normal,
});

const SettingFieldName = styled.span({
  fontSize: vars.fontSize.xxs,
  fontWeight: 'bold',
});

const SettingFieldValue = styled.p<{ grayout?: boolean }>((props) => ({
  fontSize: vars.fontSize.xs,
  fontFamily: vars.fontFamily.monospaced,
  ...(props.grayout && {
    fontSize: vars.fontSize.xxs,
    color: vars.colors.darksilver,
  }),
}));

export default ExifDisplayZone;

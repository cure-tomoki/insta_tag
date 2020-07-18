import { assert } from '~/utils/commonUtils';

enum positions {
  year = 0,
  month,
  day,
  hour,
  minute,
  second,
}

// converts datetime string of format "YYYY:MM:DD hh:mm:ss" to date string
export const parseExifDate = (datetime: string): string | undefined => {
  const tokens = datetime.split(/[:\s]+/);

  if (tokens.length !== 6) {
    console.warn(`could not parse datetime "${datetime}"`);
    return undefined;
  }

  return `${tokens[positions.year]}.${tokens[positions.month]}.${
    tokens[positions.day]
  }`;
};

import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


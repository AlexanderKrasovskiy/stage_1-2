import { State } from '../components/types';

export function stringifyJsonWithSet(stateData: State) {
  return JSON.stringify(stateData, function replacer(key, val) {
    if (key === 'brand' || key === 'storage' || key === 'color' || key === 'inCart') return [...val.values()];
    if (key === 'search') return '';
    return val;
  });
}

export function parseJsonWithSet(stateDataJson: string): State {
  return JSON.parse(stateDataJson, function (key, val) {
    if (key === 'brand' || key === 'storage' || key === 'color' || key === 'inCart') return new Set(val);

    return val;
  });
}

export function makeDeepCopyWithSet(stateData: State) {
  return parseJsonWithSet(stringifyJsonWithSet(stateData));
}

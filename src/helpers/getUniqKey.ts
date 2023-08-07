import _ from 'lodash';

export default function getUniqKey(city: string): string {
  return _.uniqueId(city);
}

import moment from 'moment';
import { DateFormat } from '../../../type/date';

export const dateFormat = (date: string, format: DateFormat = DateFormat.YYYY_MM_DD) => {
  return moment(date).format(format);
};
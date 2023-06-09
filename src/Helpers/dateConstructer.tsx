import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

export const dateConstructer = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = format(date, 'd MMMM yyyy', { locale: enGB });
  return formattedDate;
};

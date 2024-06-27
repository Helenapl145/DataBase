import { format } from 'date-fns';
import {pt} from 'date-fns/locale';

export function dateFormat() {
    const currentDate = new Date()

    return format(currentDate, 'dd MMM yyyy, EEEE', { locale: pt });
}
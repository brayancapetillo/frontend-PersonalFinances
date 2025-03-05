import { Pipe, PipeTransform } from '@angular/core'
import dayjs from 'dayjs'

@Pipe({
	name: 'dateFormat',
	standalone: true
})
export class DateFormatPipe implements PipeTransform {
	private predefinedFormats: Record<string, string> = {
		shortDate: 'DD/MM/YYYY',
		longDate: 'MMMM DD, YYYY',
		time: 'HH:mm:ss',
		fullDateTime: 'DD/MM/YYYY HH:mm:ss'
	}

	/**
	 * Transforms a date into the specified or predefined format.
	 * @param value - The date to format (string, Date, or number).
	 * @param format - The desired format or a predefined key.
	 * @returns The formatted date as a string.
	 */
	transform(value: string | Date | number, format: string = 'MMM D, YYYY h:mm A'): string {
		const chosenFormat = this.predefinedFormats[format] || format
		return dayjs(value).format(chosenFormat)
	}
}

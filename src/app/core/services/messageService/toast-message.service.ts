import { inject, Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'
import { typeToastMessage } from '../../../shared/types/toastMessage/toastMessage'
@Injectable({
	providedIn: 'root'
})
export class ToastMessageService {
	//+============= SERVICES =============+\\
	private readonly messagePNG: MessageService = inject(MessageService)

	constructor() {}

	public add(severity: typeToastMessage, summary: string, detail: string) {
		this.messagePNG.add({ severity, summary, detail, life: 3000 })
	}

	public addAll(severity: typeToastMessage, summary: string, detail: string): void {
		this.messagePNG.addAll([{ severity, summary, detail }])
	}
}

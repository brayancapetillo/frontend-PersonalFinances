// - Angular Imports
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { inject, Injectable } from '@angular/core'

// - Constant's Imports
import { cookies, typeCookie } from '@shared/constants/cookies/cookies'

// - Service's Imports
import { CookieService } from 'ngx-cookie-service'

/**
 * Service to manage the application's theme preferences and toggle bar state.
 * Provides functionality for setting and retrieving theme and toggle bar configurations,
 * as well as persisting them in cookies.
 */
@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	//+===================== SERVICES =====================+\\
	private readonly cookieService: CookieService = inject(CookieService)

	//+===================== COOKIES =====================+\\
	private readonly themeDarkCookie: boolean = this.cookieService.get(cookies.themeDark) === 'true'
	private readonly toggleBarCookie: boolean = this.cookieService.get(cookies.toggleBarCookie) === 'true'

	//+===================== SUBJECTS =====================+\\
	private darkTheme$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.themeDarkCookie)
	private toogleBar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.toggleBarCookie)

	constructor() {
		this.initializeSubscriptions()
	}

	//&===================== THEME =====================&\\
	/**
	 * Getter for the dark theme state as an observable.
	 * Allows other components to subscribe to theme changes.
	 * @public
	 * @returns {Observable<boolean>}
	 */
	public get darkTheme(): Observable<boolean> {
		return this.darkTheme$.asObservable()
	}

	/**
	 * Setter for the dark theme state. Updates the value of the dark theme subject.
	 * @param {boolean} theme - New state of the dark theme.
	 * @public
	 */
	public set darkTheme(theme: boolean) {
		this.darkTheme$.next(theme)
	}

	/**
	 * Applies the dark theme by updating the cookie and toggling the CSS class on the document body.
	 * @param {boolean} isDarkTheme - True to enable dark theme, false to disable it.
	 * @public
	 * @returns {void}
	 */
	public setTheme(isDarkTheme: boolean): void {
		this.updateCookie(cookies.themeDark, isDarkTheme)
		const htmlBody: HTMLElement = document.body
		htmlBody.classList.toggle('dark', isDarkTheme)
	}

	//&===================== TOGGLE BAR =====================&\\
	/**
	 * Getter for the toggle bar state as an observable.
	 * Allows other components to subscribe to toggle bar state changes.
	 * @public
	 * @returns {Observable<boolean>}
	 */
	public get toggleBar(): Observable<boolean> {
		return this.toogleBar$.asObservable()
	}

	/**
	 * Setter for the toggle bar state. Updates the value of the toggle bar subject.
	 * @param {boolean} toggle - New state of the toggle bar.
	 * @public
	 */
	public set toggleBar(toggle: boolean) {
		this.toogleBar$.next(toggle)
	}

	//&===================== INITIALIZATION =====================&\\
	/**
	 * Initializes subscriptions to listen for changes in theme and toggle bar state.
	 * Updates the corresponding cookies and applies the changes as needed.
	 * @private
	 * @returns {void}
	 */
	private initializeSubscriptions(): void {
		this.darkTheme$
			.pipe(
				tap((isDark: boolean) => {
					this.setTheme(isDark)
				})
			)
			.subscribe()

		this.toogleBar$
			.pipe(
				tap((isToggle: boolean) => {
					this.updateCookie(cookies.toggleBarCookie, isToggle)
				})
			)
			.subscribe()
	}

	//&===================== UTILS =====================&\\
	/**
	 * Updates a cookie with a new boolean value.
	 * @param {typeCookie} cookie - The name of the cookie to update.
	 * @param {boolean} value - The new value to store in the cookie.
	 * @private
	 * @returns {void}
	 */
	private updateCookie(cookie: typeCookie, value: boolean): void {
		this.cookieService.set(cookie, String(value), { path: '/' })
	}
}

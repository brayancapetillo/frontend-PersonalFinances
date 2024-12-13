export type typeCookie = (typeof cookies)[keyof typeof cookies]

export const cookies = {
	token: 'token',
	refreshToken: 'refreshToken',
	themeDark: 'themeDark',
	toggleBarCookie: 'toggleBarCookie'
} as const

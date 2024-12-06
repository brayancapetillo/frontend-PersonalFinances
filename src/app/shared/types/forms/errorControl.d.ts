export interface ErrorDetails {
	title: string
	errors: Record<string, string>
}
type ErrorMessages = Record<'email' | 'password' | 'userName', ErrorDetails>

type controlSelector = keyof ErrorMessages

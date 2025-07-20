export interface ApiResponse<T> {
	readonly code: number
	readonly message: string|null
	readonly data: T
}
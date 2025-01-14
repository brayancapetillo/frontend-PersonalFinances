import { categoryType } from '../categoryType/categoryType'

export interface category {
	id: number
	name: string
	idCategoryType: number
	categoryType?: categoryType
}

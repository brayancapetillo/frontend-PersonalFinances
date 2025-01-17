// -Model's Imports
import { categoryType } from '@shared/models/categoryType/categoryType'

export interface category {
	id: number
	name: string
	idCategoryType: number
	categoryType?: categoryType
}

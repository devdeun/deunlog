import { NOTES_CATEGORIES } from '@/consts'

export type NotesCategoryType = keyof typeof NOTES_CATEGORIES

export const isValidCategory = (category: string | undefined): category is NotesCategoryType => {
  if (!category) return false
  return category in NOTES_CATEGORIES
}

export const getCategoryTitleList = (categoryList: NotesCategoryType[]) => {
  return categoryList.map((category) => ({
    slug: category,
    title: NOTES_CATEGORIES[category],
  }))
}

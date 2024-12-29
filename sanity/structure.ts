import { definePlugin } from 'sanity'

/**
 * This config is used to define the custom structure for Sanity Studio
 * The structure is used to define how the sidebar and lists of documents are presented in the Studio
 */

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: any) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author'].includes(item.getId()!)
      ),
    ])

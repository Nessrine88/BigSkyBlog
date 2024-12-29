import { definePlugin, type DocumentDefinition } from 'sanity'
import { StructureBuilder } from 'sanity/desk'

// This plugin contains all the logic for setting up the `Settings` singleton

export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: 'settings',
    document: {
      // Hide 'Settings' from new document options
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId !== type)
        }

        return prev
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
})

// The StructureResolver is how we're changing the DeskTool structure to link to a single "Settings" document
// You don't need to import StructureResolver directly anymore in Sanity v3.
export const settingsStructure = (typeDef: DocumentDefinition) => {
  return (S: StructureBuilder) => {
    // The `Settings` root list item
    const settingsListItem = S.listItem()
      .title(typeDef.title)
      .icon(typeDef.icon)
      .child(
        S.editor()
          .id(typeDef.name)
          .schemaType(typeDef.name)
          .documentId(typeDef.name)
      )

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => listItem.getId() !== typeDef.name
    )

    return S.list()
      .title('Content')
      .items([settingsListItem, S.divider(), ...defaultListItems])
  }
}

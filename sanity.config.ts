'use client'

/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { locate } from 'plugins/locate'
import { previewDocumentNode } from 'plugins/previewPane'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { presentationTool } from 'sanity/presentation'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import authorType from 'schemas/author'
import postType from 'schemas/post'
import settingsType from 'schemas/settings'

// Define the structure directly
const structure = (S: any) =>
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

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    types: [authorType, postType, settingsType],
  },
  plugins: [
    presentationTool({
      locate,
      previewUrl: {
        previewMode: {
          enable: 'true',
        },
      },
    }),
    settingsPlugin({ type: settingsType.name }),
    unsplashImageAsset(),
    process.env.NODE_ENV !== 'production' &&
      visionTool({ defaultApiVersion: apiVersion }),
  ],
  structure: structure, // Assign the structure directly
})

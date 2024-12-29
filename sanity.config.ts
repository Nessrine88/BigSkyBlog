'use client'

/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  dataset,
  DRAFT_MODE_ROUTE,
  projectId,
} from 'lib/sanity.api'
import { locate } from 'plugins/locate'
import { previewDocumentNode } from 'plugins/previewPane'  // Assuming this is where previewDocumentNode is defined
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'

// Correct import for structure
import { structure } from 'sanity/structure'  // Use 'structure' instead of 'structureTool'

import { presentationTool } from '@sanity/presentation'  // Corrected import path for presentationTool
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import authorType from 'schemas/author'
import postType from 'schemas/post'
import settingsType from 'schemas/settings'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [authorType, postType, settingsType],
  },
  plugins: [
    structure({
      structure: settingsStructure(settingsType),  // Pass the structure here
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: (S, { schemaType }) => previewDocumentNode(S, { schemaType }),  // Pass S and schemaType here
    }),
    // Ensure `presentationTool` is correctly configured
    presentationTool({
      locate,  // assuming you have `locate` logic to handle locale
      previewUrl: {
        previewMode: {
          enable: DRAFT_MODE_ROUTE,
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsType.name }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV !== 'production' &&
      visionTool({ defaultApiVersion: apiVersion }),
  ],
})

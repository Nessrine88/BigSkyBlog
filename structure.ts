import { Iframe } from "sanity-plugin-iframe-pane";
import { StructureBuilder } from "sanity/desk"; // Import from deskTool

export const getDefaultDocumentNode = ({ schemaType, S }: { schemaType: string, S: StructureBuilder }) => {
  // Conditionally return a different configuration based on the schema type
  if (schemaType === "post") {
    return S.document().views([
      S.view.form(), // Default form view

      // Add the iframe view for preview
      S.view
        .component(Iframe)
        .options({
          url: `${
            process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
          }/api/preview`, // URL for preview
          defaultSize: "desktop", // Default size for the iframe
          reload: {
            button: true, // Show a reload button
          },
          attributes: {}, // Additional iframe attributes (if any)
        })
        .title("Preview"), // Title of the preview view
    ]);
  }
};

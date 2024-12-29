import { DRAFT_MODE_ROUTE } from 'lib/sanity.api';
import { Iframe, IframeOptions } from 'sanity-plugin-iframe-pane';
import authorType from 'schemas/author';
import postType from 'schemas/post';

import AuthorAvatarPreviewPane from './AuthorAvatarPreviewPane';

// Define iframe options with preview URL logic
const iframeOptions = {
  url: {
    origin: 'same-origin',
    preview: (document: any) => {
      if (!document) {
        return new Error('Missing document');
      }
      switch (document._type) {
        case 'post':
          return document?.slug?.current
            ? `/posts/${document.slug.current}`
            : new Error('Missing slug');
        default:
          return new Error(`Unknown document type: ${document?._type}`);
      }
    },
    draftMode: DRAFT_MODE_ROUTE,
  },
  reload: { button: true },
} satisfies IframeOptions;

// Configure document views
export const previewDocumentNode = (S: any, { schemaType }: { schemaType: string }) => {
  switch (schemaType) {
    case authorType.name:
      return S.document().views([
        S.view.form(),
        S.view
          .component(({ document }: any) => (
            <AuthorAvatarPreviewPane
              name={document.displayed.name}
              picture={document.displayed.picture}
            />
          ))
          .title('Preview'),
      ]);

    case postType.name:
      return S.document().views([
        S.view.form(),
        S.view.component(Iframe).options(iframeOptions).title('Preview'),
      ]);

    default:
      return null;
  }
};

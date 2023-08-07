import {SanityDocument, defineConfig} from 'sanity'
import {DefaultDocumentNodeResolver, deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import Iframe from 'sanity-plugin-iframe-pane'
import {schemaTypes} from './schemas'


const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
    // Only show preview pane on `movie` schema type documents
    switch (schemaType) {
      case `post`:
        return S.document().views([
          S.view.form(),
          S.view
            .component(Iframe)
            .options({
              url: (doc: SanityDocument | any) => getPreviewUrl(doc),
            })
            .title('Preview'),
        ])
      default:
        return S.document().views([S.view.form()])
    }
  }

  // Customize this function to show the correct URL based on the current document
function getPreviewUrl(doc: SanityDocument | any) {
    return doc?.slug?.current
      ? `http://192.168.1.128:3000/${doc?.slug?.current}`
      : window.location.host
  }
export default defineConfig({
    name: 'default',
    title: 'Migration to V3',
  
    projectId: 'djpypalz',
    dataset: 'production',
  
    plugins: [deskTool({
      defaultDocumentNode
    }), visionTool()],
  
    schema: {
      types: schemaTypes,
    },
  })
  
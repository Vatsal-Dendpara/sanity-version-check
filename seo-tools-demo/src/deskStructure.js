// src/deskStructure.js
import S from "@sanity/desk-tool/structure-builder";
import { MdSettings } from "react-icons/md";

export default () =>
  S.list()
    .title("Content")
    .items([
      // Other list items...
      S.listItem()
        .title("Blog Posts")
        .child(
          S.documentTypeList("post")
            .title("Blog Posts")
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType("post")
                .views([
                  S.view.form(),
                  S.view
                    .component(
                      // This component will display the SEO settings
                      // provided by the sanity-plugin-seo-tools package
                      // Make sure to import the right component name
                      "sanity-plugin-seo-tools/seo-preview"
                    )
                    .title("SEO Settings")
                    .icon(MdSettings),
                ])
            )
        ),
      // Other list items...
    ]);

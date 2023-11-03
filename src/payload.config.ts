import path from "path";
import { S3Client } from "@aws-sdk/client-s3";
import s3Upload from "payload-s3-upload";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Issues from "./collections/Issues";
import Media from "./collections/Media";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  collections: [Users, Issues, Media],
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    payloadCloud(),
    s3Upload(
      new S3Client({
        endpoint: "https://s3.us-east-005.backblazeb2.com",
        // region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_KEY,
          secretAccessKey: process.env.AWS_SECRET,
        },
      })
    ),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});

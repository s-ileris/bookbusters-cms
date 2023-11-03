import { CollectionConfig } from "payload/types";

const Issues: CollectionConfig = {
  slug: "issues",
  fields: [
    {
      name: "title", // required
      type: "text", // required
      required: true,
      label: "Title",
    },
    {
      name: "cover", // required
      type: "upload", // required
      relationTo: "media", // required
      required: true,
      label: "cover",
    },
  ],
};

export default Issues;

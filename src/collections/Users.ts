import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name", // required
      type: "text", // required
      required: true,
      label: "Name",
    },
  ],
};

export default Users;

import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { i, r }) => {
    // if item is retrieved, update the record
    await db.patch(i, {retrieved: r});
})
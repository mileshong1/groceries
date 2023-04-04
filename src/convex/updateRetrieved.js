import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { id, r }) => {
    // if item is retrieved, update the record

    const task = await db.get(id);
    console.log(task)

    await db.patch("items", task._id, {r});

})
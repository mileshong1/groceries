import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { text, type, user }) => {
    // this should check if the item is already in the list
    // really should be checked via text
    const inList = await db
        .query("items")
        .filter(q => q.eq(q.field("text"), text))
        .collect()
    
    if (inList.length > 0)
        return "not unique"

    // it should also check if the item is already in available table
    // if so --> do nothing
    // if not --> add to available table too
    const availableItems = await db
        .query("available")
        .filter(q => q.eq(q.field("text"), text))
        .collect()

    if (availableItems.length == 0) {
        await db.insert("available", {
            text: text,
            type: type
        })
    }

    const item = { 
        retrieved: false,
        text: text,
        type: type,
        user: user
     }

     await db.insert("items", item)

     return "ok"
})
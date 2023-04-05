import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { text, type, quantity, user }) => {
    // if quantity is 0, reject
    console.log(quantity)
    if (quantity == "0" || quantity <= 0)
        return "quantity can not be 0"

    // this should check if the item is already in the list
    // really should be checked via text
    const inList = await db
        .query("items")
        .filter(q => q.eq(q.field("text"), text))
        .collect()
    
    // if item is in the list, we should add quantity
    if (inList.length > 0) {
        if (inList.length > 1)
            return "not unique"

        const item = inList[0]

        await db.patch(item._id, {quantity: (+quantity) + (+item.quantity)})
        return "ok"
    } 
        

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

    console.log(text)
    const item = { 
        retrieved: false,
        text: text,
        type: type,
        quantity: quantity,
        user: user
     }

     await db.insert("items", item)

     return "ok"
})
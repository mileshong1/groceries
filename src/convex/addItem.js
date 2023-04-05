import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { text, type, user }) => {
    
    console.log(text, type, user)

    const item = { 
        retrieved: false,
        text: text,
        type: type,
        user: user
     }

     let a = await db.insert("items", item)
     console.log(a)
})
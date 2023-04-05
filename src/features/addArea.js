import { useState } from "react"
import { useQuery, useMutation } from "../convex/_generated/react"

function AddArea() {

    const [newText, setNewText] = useState("")
    const [newType, setNewType] = useState("fruit")

    const [user] = useState(() => "User " + Math.floor(Math.random() * 10000));

    const addItem = useMutation("addItem")
    const availableItems = useQuery("getAvailable") || []

    const [itemNotOk, setItemNotOk] = useState(false)

    async function handleAddItem(event) {
        event.preventDefault();

        setNewText("")
        setNewType("")

        const result = await addItem(
            {
                text: newText,
                type: newType,
                user: user
            }
        )
        console.log(result)
        if (result === "ok")
            setItemNotOk(false)
        else
            setItemNotOk(true)
    }

    return (
        <div>
            {availableItems.map(item => (
                <li key={item._id.toString()}>
                    <span>{item.text}</span>
                    <span>{item.type}</span>

                    <form>
                        <pre>Quantity:</pre>
                        <input
                            type="number"
                            defaultValue={0}
                        />

                        <input type="submit" value="+"></input>
                    </form>
                </li>
            ))}
            
            <h1>Item Not There? Add Here:</h1>    
            <form onSubmit={handleAddItem}>
                <input
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                    placeholder="Item Name"
                />

                <select
                    value={newType}
                    onChange={e => setNewType(e.target.value)}
                >    
                    <option value="fruit">fruit</option>
                    <option value="meat">meat</option>
                    <option value="vegetable">vegetable</option>
                    <option value="spices">spices</option>
                    <option value="spices">grain</option>
                    <option value="misc">misc</option>    
                </select>

                <input type="submit" value="Add" disabled={!newText && !newType} />
            </form>

            {itemNotOk && (
                <span>Item already added!</span>
            )}
        </div>
    )
}

export default AddArea
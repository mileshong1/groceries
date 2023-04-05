import { useState } from "react"
import { useQuery, useMutation } from "../convex/_generated/react"

function AddArea() {

    const [newText, setNewText] = useState("")
    const [newType, setNewType] = useState("fruit")

    const [user] = useState(() => "User " + Math.floor(Math.random() * 10000));

    const addItem = useMutation("addItem")
    async function handleAddItem(event) {
        event.preventDefault();

        setNewText("")
        setNewType("")

        await addItem(
            {
                text: newText,
                type: newType,
                user: user
            }
        )
    }

    return (
        <div>
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

        </div>
    )
}

export default AddArea
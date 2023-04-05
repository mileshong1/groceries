import { useState } from "react"
import { useQuery, useMutation } from "../convex/_generated/react"
import './addArea.css'

function AddArea() {

    const [newText, setNewText] = useState("")
    const [newType, setNewType] = useState("fruit")
    const [newQuantity, setNewQuantity] = useState(0)

    const [user] = useState(() => "User " + Math.floor(Math.random() * 10000));

    const addItem = useMutation("addItem")
    const availableItems = useQuery("getAvailable") || []

    const [itemNotOk, setItemNotOk] = useState(false)

    async function handleAddItem(event) {
        event.preventDefault();

        setNewText("")
        setNewType("")
        setNewQuantity(0)

        const result = await addItem(
            {
                text: newText,
                type: newType,
                quantity: newQuantity,
                user: user
            }
        )
        console.log(result)
        if (result === "ok")
            setItemNotOk(false)
        else
            setItemNotOk(true)
    }

    async function handleAddItemFromAvailable(event, text, type) {
        event.preventDefault();
        const result = await addItem(
            {
                text: text,
                type: type,
                quantity: newQuantity,
                user: user
            }
        )
    
        if (result === "ok") {
            setItemNotOk(false)
            setNewQuantity(0)
        }
            
        else
            setItemNotOk(true)
    }

    return (
        <div>
            {availableItems.map(item => (
                <li key={item._id.toString()}>
                    <div className="item-details">
                        <span>{item.text}</span>
                        <span>{item.type}</span>
                    </div>
                    

                    <form 
                        className="quantity-add"
                        onSubmit={(e) => handleAddItemFromAvailable(e, item.text, item.type)}
                    >
                        <div>
                            <pre>Quantity:</pre>
                            <input
                                type="number"
                                defaultValue={0}
                                value={newQuantity}
                                onChange={e => setNewQuantity(e.target.value)}
                            />
                        </div>
                        
                        <input type="submit" value="+" disabled={newQuantity <= 0}></input>
                    </form>
                </li>
            ))}
            
            <h1>Don't see your Item? Add Here:</h1>    
            <div className="custom-add-div">
                <form onSubmit={handleAddItem} className="custom-add">
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
                        <option value="grain">grain</option>
                        <option value="misc">misc</option>    
                    </select>

                    <div>
                            <pre>Quantity:</pre>
                            <input
                                type="number"
                                defaultValue={0}
                                value={newQuantity}
                                onChange={e => setNewQuantity(e.target.value)}
                            />

                    </div>
                    
                    <input type="submit" value="Add" disabled={!newText || !newType || (newQuantity <= 0)} />
                </form>
            </div>
            

            {itemNotOk && (
                <span>Could not add item!</span>
            )}
        </div>
    )
}

export default AddArea
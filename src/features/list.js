import { useQuery, useMutation } from "../convex/_generated/react"

function List() {
    const items = useQuery("getItems") || []
    const updateRetrieved = useMutation("updateRetrieved");
    const deleteItem = useMutation("deleteItem")

    async function handleUpdateRetrieved(i) {
        // toggle to opposite
        const i_id = i._id
        const retrieved = !i.retrieved

        console.log(i_id)
        console.log(retrieved)
        
        await updateRetrieved({
          i: i_id,
          r: retrieved
        });
      }

    async function handleDeleteItem(id) {
      await deleteItem({
        id: id
      })
    }  

    return (
      <div className="list">
        <ul>
        {items.map(item => (
          <li key={item._id.toString()} className="list-item">
            <div className="item-details">
              <span>{item.text} (x{item.quantity})</span>
              <span>{item.type}</span>
            </div>

            <div className="got-delete">
              <input
                  type="checkbox"
                  checked={item.retrieved}
                  onChange={() => handleUpdateRetrieved(item)}
              />

              <button type="button"
                onClick={() => handleDeleteItem(item._id)}
              >
                X
              </button>
            </div>
            
          </li>
        ))}
        </ul>
      </div>


    )
}

export default List;
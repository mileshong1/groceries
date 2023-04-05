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
      <div>
        <ul>
        {items.map(item => (
          <li key={item._id.toString()}>
            <span>{item.text}</span>

            <span>{item.type}</span>

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
          </li>
        ))}
        </ul>
      </div>


    )
}

export default List;
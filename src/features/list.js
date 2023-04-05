import { useQuery, useMutation } from "../convex/_generated/react"

function List() {
    const items = useQuery("getItems") || []
    const updateRetrieved = useMutation("updateRetrieved");
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

    return (
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
          </li>
        ))}
      </ul>
    )
}

export default List;
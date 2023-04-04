import { useQuery, useMutation } from "../convex/_generated/react"

function List() {
    const items = useQuery("getItems") || []
    const updateRetrieved = useMutation("updateRetrieved");
    async function handleUpdateRetrieved(i, r) {
        // toggle to opposite
        r = !r
        await updateRetrieved({id: i, r});
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
                onChange={() => handleUpdateRetrieved(item._id, item.retrieved)}
            />
          </li>
        ))}
      </ul>
    )
}

export default List;
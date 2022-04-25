import useFetch from "../useFetch";

const AllModerators = () => {

    var {data, isPending, error} = useFetch('http://localhost:3001/api/get-all-moderators')

    const handleDelete = () => {
        alert("Are you sure you want to delete this moderator?")
        
    }

    const handleEdit = () => {
        console.log("BBBBB")
    }

    return (
        <>
        <h2>All moderators</h2>
        {isPending && <p> Loading...</p>}
        {error && <p>ERROR OCCURED!! : {error} </p>}
        {data && 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>User id</th>
                    <th>Fisrt name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>mobile</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.result.map(moderator => (
                        <tr key={moderator.user_id}>
                        <td> {moderator.user_id} </td>
                        <td> {moderator.first_name} </td>
                        <td> {moderator.last_name} </td>
                        <td> {moderator.email} </td>
                        <td> {moderator.mobile} </td>
                        <td><a href="#" className="btn btn-danger" 
                        onClick={() =>handleDelete()}
                        >Delete</a></td>
                        <td><a href="#" className="btn btn-info"
                         onClick={() => handleEdit()}
                        >Edit</a></td>
                    </tr>
                ))}
            </tbody>
        </table>
        }
        </>
    );
}
 
export default AllModerators;
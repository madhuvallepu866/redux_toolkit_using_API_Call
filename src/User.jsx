import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "./Store"

const User=()=>{

    let users=useSelector((state)=>state.user.users)
    let status=useSelector((state)=>state.user.status)
    let error=useSelector((state)=>state.user.error)
   


    const dispatch=useDispatch()


    useEffect(
        ()=>{
            dispatch(fetchUsers());
        },[]
    )


    return(
        <>
        <div className="container">
            <h2 className="text-center text-primary m-5">User Data using Toolkit async Thunk</h2>
           {
            status === 'loading' && <h2 className="text-warning">Please wait Data Loading</h2>
           }
           {
            status === 'completed' && error === false && (
                <table className="table table-bordered w-72 " >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
              <tbody>
                    {
                        users.map(
                            (user)=>(
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
               
            </table>
            )
           }
           {
            error && <h2 className="text-danger">{error}</h2>
           }
        </div>
        </>
    )
}
export default User
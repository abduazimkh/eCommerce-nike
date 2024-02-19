import { User } from '../../../types/ElementTypes.d'
import axios from "../../../api/axios";

const UserTr = ({user} : {user: User}) => {

    const handlePromotUser = () => {
      console.log(user.email)
        axios.post("/admin/add-admin", {email: user.email})
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

  return (
    <tr>
      <td>{user.first_name}</td>
      <td>
        {user.email}
      </td>
      <td>
       {user.role}
      </td>
      <td><img width={50} height={50} src={user.photo_url} alt="" /></td>
      <td>
        <div className="table-action__wrapper">
          <button className="btn btn-warning" onClick={handlePromotUser}>Promote</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </td>
    </tr>
  )
}

export default UserTr
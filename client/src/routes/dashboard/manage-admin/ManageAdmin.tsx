import Table from "../../../components/table/Table"
import useFetch from "../../../helpers/hooks/useFetch";

const ManageAdmin = () => {

  const {data} = useFetch("/admin/registered-users");

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2>Manage Admins</h2>
      </div>
      <div className="dashboard-info">
          <Table type="user" data={data} />
      </div>
    </div>
  )
}

export default ManageAdmin
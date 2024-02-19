import { useSelector } from "react-redux"
import Table from "../../components/table/Table"
import { RootState } from "../../redux/store"
import { Product } from "../../types/ElementTypes.d"
const Liked = () => {
    const auth = useSelector((state:RootState) => state.auth)

  return (
    <div className='dashboard-content'>
        <div className="dashboard-header">
            <h2>Liked Products</h2>
        </div>
        <div className="dashboard-info">
            <Table type="liked" data={auth.user?.liked as Product[]}/>
        </div>
    </div>
  )
}

export default Liked
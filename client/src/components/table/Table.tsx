import { Product, User } from "../../types/ElementTypes.d";
import "./Table.scss";
import ProductTr from "./product-tr/ProductTr";
import UserTr from "./user-tr/UserTr";

const Table = ({ data, type, setEditProduct, editProduct }: { data: Product[] | User[], type: "user" | "product" | "liked", editProduct: Product | null, setEditProduct:  React.Dispatch<React.SetStateAction<Product | null>>}) => {
  return (
    <div className="table-wrapper">
      <table className="dashboard-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>{type === "user" ? "Email" : "Variant"} </th>
          <th>{type === "user" ? "Role" : "Type"}</th> 
          {type !== "user" && <th>Likes</th>}
          <th>Image</th>
          {type !== "liked" && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => {
          if(type === "product" || type === "liked"){
            return <ProductTr setEditProduct={setEditProduct} editProduct={editProduct} product={item as Product} type={type} key={index} />
          }
          else{
            return <UserTr user={item as User} key={index} />
          }
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
    </div>
  );
};

export default Table;

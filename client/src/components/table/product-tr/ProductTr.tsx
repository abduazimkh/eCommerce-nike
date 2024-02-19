import { Product } from "../../../types/ElementTypes.d";
import { AxiosError, AxiosResponse } from "axios";
import axios from "../../../api/axios"

const ProductTr = ({ product, type, editProduct, setEditProduct } : { product: Product, type:  "product" | "liked",  editProduct: Product | null, setEditProduct:  React.Dispatch<React.SetStateAction<Product | null>> }) => {

  const handleProductDelete = () => {
    const adminAgree = confirm("Are you really going to delete this product?");
    if(adminAgree){
      axios.delete(`/product/${product._id}`)
      .then((response: AxiosResponse) => console.log(response.data))
      .catch((error: AxiosError) => console.log(error))
    }
  }

  return (
    <tr>
      <td>{product.product_name}</td>
      <td>
        <p className="table-variant__wrapper">
          {product.variants.map((variant, index) => (
          <span key={index}>{variant.variant_value}</span>
        ))}
        </p>
      </td>
      <td>{product.product_type}</td>
      <td>{product.likes}</td>
      <td>
        <img width={50} height={50} src={product.product_images[0]} alt="" />
      </td>
      {type === "product" && <td>
        <div className="table-action__wrapper">
          <button onClick={() => setEditProduct(product)} className="link btn-warning">Edit</button>
          <button onClick={handleProductDelete} className="link btn-danger">Delete</button>
        </div>
      </td>}
    </tr>
  );
};

export default ProductTr;

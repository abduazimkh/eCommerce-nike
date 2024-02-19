import { useParams } from "react-router-dom";
import useFetch from "../../helpers/hooks/useFetch";
import { Product } from "../../types/ElementTypes.d";
import "./Category.scss";
import CategoryProduct from "../../components/category-product/CategoryProduct";

const Category = () => {
  const { categoryname } = useParams();
  const { data } = useFetch(`/product/by?category=${categoryname}`);
  return (
    <div className="category-wrapper">
      <div className="category-filter"></div>
      <div className="category-product__wrapper">
        {data.map((product: Product) => (
          <CategoryProduct product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;

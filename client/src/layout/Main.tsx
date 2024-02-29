// import React, { useEffect } from 'react';
// import axios from "../api/axios";

import CategoryCarousel from "../components/category-carousel/CategoryCarousel";
import Category from "../components/category/Category";
import ProductCarousel from "../components/product-carousel/ProductCarousel";
import { Container } from "../utils/Utils";

const Main = () => {
  return (
    <main>
      <Container>
        <Category />
        <ProductCarousel/>
        <CategoryCarousel/>
      </Container>
    </main>
  )
}

export default Main
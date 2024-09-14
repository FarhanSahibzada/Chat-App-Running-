const fetchProducts = async (categorie) => {
  try {
    const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
    const data = await response.json();    
    const filteredProducts = data.filter(
      (product) => product.product_type === categorie
    );
    return filteredProducts.length === 0 ? data : filteredProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default fetchProducts;

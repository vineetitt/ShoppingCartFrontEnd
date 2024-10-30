import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/shop.css";
import { getProducts } from "../api/apiService";
import { getCategories } from "../api/categoryService";
import { addToCart } from "../api/cartService";
import { useNavigate } from "react-router-dom";

const id = localStorage.getItem("userId");

const handleAddToCart = async (cartData) => {
  const res = await addToCart(cartData);
  if (res.status !== 200) {
    toast.error("No Stock!");
    return;
  }

  toast.success("Added to cart!");
};

const Shop = () => {
  const [filteredCategory, setFilteredCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [quantity, setQuantity] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(filteredCategory, pageNumber, 6);
        setProducts(response.data);
        setMaxPage(response.maxPage);
        setLoadingProducts(false);
      } catch (error) {
        setErrorProducts("Failed to fetch products");
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [pageNumber, filteredCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoadingCategories(false);
      } catch (error) {
        setErrorCategories("Failed to fetch categories");
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setFilteredCategory(category.categoryId);
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleQuantityChange = (productId, newQuantity, stockQuantity) => {
    const updatedQuantity = Math.min(newQuantity, stockQuantity);
    if (newQuantity > stockQuantity) {
      toast.error(`Only ${stockQuantity} items left in stock!`);
    }
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: updatedQuantity < 1 ? 1 : updatedQuantity,
    }));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loadingProducts || loadingCategories) {
    return <div>Loading...</div>;
  }

  if (errorProducts) {
    return <div>{errorProducts}</div>;
  }

  if (errorCategories) {
    return <div>{errorCategories}</div>;
  }

  return (
    <div className="shop-container">
      <div className="sidebar">
        <div className="categories">
          <h3>Categories</h3>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setFilteredCategory("")}
            style={{ marginBottom: "8px" }}
          >
            All Products
          </Button>
          {categories
            .filter((c) => c.categoryId !== 4)
            .map((category) => (
              <Button
                key={category.categoryId}
                fullWidth
                variant="outlined"
                onClick={() => handleCategoryClick(category)}
                style={{ marginBottom: "8px" }}
              >
                {category.categoryName}
              </Button>
            ))}
        </div>
      </div>

      <div className="product-list">
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.productId}>
              <Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    handleProductClick(product);
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                </div>
                <CardContent>
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography variant="body1">${product.price}</Typography>

                  {product.stockQuantity == 0 ? (
                    <Typography
                      variant="body2"
                      color={product.stockQuantity < 5 && "red"}
                      style={{ fontWeight: "bold" }}
                    >
                      Out of Stock!
                    </Typography>
                  ) : (
                    product.stockQuantity <= 5 && (
                      <Typography
                        variant="body2"
                        color={product.stockQuantity < 5 && "red"}
                        style={{ fontWeight: "bold" }}
                      >
                        Stock: ony{product.stockQuantity} left!
                      </Typography>
                    )
                  )}

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ fontWeight: "bold" }}
                  >
                    Size: {product.size}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "5px 0px",
                    }}
                  >
                    <Button
                      onClick={() =>
                        handleQuantityChange(
                          product.productId,
                          (quantity[product.productId] || 1) - 1
                        )
                      }
                      disabled={
                        (quantity[product.productId] || 1) <= 1 ||
                        product.stockQuantity === 0
                      }
                    >
                      -
                    </Button>
                    <span style={{ margin: "0 10px" }}>
                      {quantity[product.productId] || 1}
                    </span>
                    <Button
                      onClick={() =>
                        handleQuantityChange(
                          product.productId,
                          (quantity[product.productId] || 1) + 1,
                          product.stockQuantity
                        )
                      }
                      disabled={
                        product.stockQuantity === 0 ||
                        (quantity[product.productId] || 1) >=
                          product.stockQuantity
                      }
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    style={{ marginBottom: "8px" }}
                    onClick={() => {
                      handleAddToCart({
                        productId: product.productId,
                        userId: id,
                        quantity: quantity[product.productId] || 1,
                      });
                    }}
                    disabled={product.stockQuantity === 0}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      handleAddToCart({
                        productId: product.productId,
                        userId: id,
                        quantity: quantity[product.productId] || 1,
                      });
                      navigate("/address");
                    }}
                    disabled={product.stockQuantity === 0}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={maxPage}
            page={pageNumber}
            onChange={handlePageChange}
          />
        </div>

        {/* popup product page*/}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          {selectedProduct && (
            <>
              <DialogTitle>
                {" "}
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDialog}
                  style={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: "grey",
                  }}
                >
                  <CloseIcon />{" "}
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.productName}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <Typography variant="body1" style={{ margin: "20px 0" }}>
                  {selectedProduct.description}
                </Typography>

                <Typography variant="h6" color="textSecondary">
                  Price: ${selectedProduct.price}
                </Typography>

                {selectedProduct.stockQuantity === 0 ? (
                  <Typography
                    variant="body2"
                    color="error"
                    style={{ fontWeight: "bold" }}
                  >
                    Out of stock
                  </Typography>
                ) : (
                  selectedProduct.stockQuantity <= 5 && (
                    <Typography
                      variant="body2"
                      color="error"
                      style={{ fontWeight: "bold" }}
                    >
                      Only {selectedProduct.stockQuantity} left in stock!
                    </Typography>
                  )
                )}

                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontWeight: "bold" }}
                >
                  Size: {selectedProduct.size}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px 0",
                  }}
                >
                  <Button
                    onClick={() =>
                      handleQuantityChange(
                        selectedProduct.productId,
                        (quantity[selectedProduct.productId] || 1) - 1
                      )
                    }
                    disabled={(quantity[selectedProduct.productId] || 1) <= 1}
                  >
                    -
                  </Button>
                  <span style={{ margin: "0 10px" }}>
                    {quantity[selectedProduct.productId] || 1}
                  </span>
                  <Button
                    onClick={() =>
                      handleQuantityChange(
                        selectedProduct.productId,
                        (quantity[selectedProduct.productId] || 1) + 1,
                        selectedProduct.stockQuantity
                      )
                    }
                    disabled={
                      (quantity[selectedProduct.productId] || 1) >=
                      selectedProduct.stockQuantity
                    }
                  >
                    +
                  </Button>
                </div>

                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  style={{ marginBottom: "8px" }}
                  onClick={() => {
                    handleAddToCart({
                      productId: selectedProduct.productId,
                      userId: id,
                      quantity: quantity[selectedProduct.productId] || 1,
                    });
                  }}
                  disabled={selectedProduct.stockQuantity === 0}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    handleAddToCart({
                      productId: selectedProduct.productId,
                      userId: id,
                      quantity: quantity[selectedProduct.productId] || 1,
                    });
                    navigate("/address");
                  }}
                  disabled={selectedProduct.stockQuantity === 0}
                >
                  Buy Now
                </Button>
              </DialogContent>
            </>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default Shop;

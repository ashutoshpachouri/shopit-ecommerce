import React, { useState, useEffect } from "react";
import MetaData from "./layouts/MetaData";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Products from "./product/Product";
import Loader from "./layouts/Loader";

import { useAlert } from "react-alert";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([1, 1000]);

  const [category, setCategory] = useState('');

  const [rating, setRating] = useState(0);

  const categories=[
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ]

  const alert = useAlert();

  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(
    (state) => state.products
  );

 


  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    console.log("entered")
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;

  if (category) {
    count = filteredProductsCount;
  }

  return (
    <>
      <MetaData title="Buy Best " />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <>
                  <div className="col-6 col-md-3 mt-3 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                      <div className="mt-3">
                        <h4 className="mb-3">
                          Categories
                        </h4>
                        <ul className="pl-0">
                          {categories.map(category=>(
                            <li style={{cursor:"pointer", listStyleType: "none"}} key={category} onClick={()=>setCategory(category)}>
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-3" />
                      <div className="mt-3">
                        <h4 className="mb-3">
                          Ratings
                        </h4>
                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map(star=>(
                            <li style={{cursor:"pointer", listStyleType: "none"}} key={star} onClick={()=>setRating(star)}>
                              <div className="rating-outer">
                                <div className="rating-inner" style={{width: `${star*20}%`}} />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Products
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                products &&
                products.map((product) => (
                  <Products key={product.id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                // nextPageText='<'
                // previousPageText='>'
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;

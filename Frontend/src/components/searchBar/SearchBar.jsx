import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import axios from "axios";
import myContext from "../../context/myContext"; // Adjust import based on your project structure

const SearchBar = () => {
  const context = useContext(myContext);
  const { setLoading } = context;
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/public/products");
      const productsArray = response.data.content || [];
      setProducts(productsArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Debounced Filter Function
  const debouncedFilter = debounce((query) => {
    if (products) {
      const results = products.filter((obj) => obj.productName.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
      setFilteredData(results);
    }
  }, 300);

  useEffect(() => {
    debouncedFilter(search);
    return () => {
      debouncedFilter.cancel();
    };
  }, [search, products]);

  return (
    <div className="position-relative">
      <div className="d-flex justify-content-center mb-2">
        <input
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control"
          style={{ width: '100%' }}
        />
      </div>

      {search && (
        <div className="position-absolute bg-light border rounded shadow-lg z-index-100 mt-1"
             style={{ width: '100%' }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.productId}
                className="p-2 cursor-pointer d-flex align-items-center border-bottom"
                onClick={() => navigate(`/productinfo/${item.productId}`)}
              >
                <img className="w-25 h-25 me-2 rounded" src={item.image} alt={item.productName} />
                <span>{item.productName}</span>
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center p-3">
              <img className="w-50" src="/no-results.png" alt="No results" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;










































// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import debounce from "lodash/debounce"; // Ensure lodash is installed
// import myContext from "../../context/myContext"; // Adjust import based on your project structure

// const SearchBar = () => {
//   const context = useContext(myContext);
//   const { getAllProduct } = context;
//   const [search, setSearch] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const navigate = useNavigate();

//   //  Debounced Filter Function: A debounced function is created to filter the getAllProduct
//   // array based on a user's search input. It waits 300 milliseconds after the user stops typing before executing,
//   // which prevents excessive filtering operations.
//   // useEffect Hook: This hook calls the debounced filter function whenever the search input or getAllProduct data changes.
//   // It ensures that the filtering is applied efficiently without lagging the application.
//   // The hook also cleans up by canceling the debounce if the component unmounts or if the dependencies change.
//   const debouncedFilter = debounce((query) => {
//     if (getAllProduct) {
//       const results = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
//       setFilteredData(results);
//     }
//   }, 300);

//   useEffect(() => {
//     debouncedFilter(search);
//     return () => {
//       debouncedFilter.cancel();
//     };
//   }, [search, getAllProduct]);

//   return (
//     <div className="position-relative">
//       <div className="d-flex justify-content-center mb-2">
//         <input
//           type="text"
//           placeholder="Search here"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="form-control"
//           style={{ width: '100%' }} // Adjust width to occupy full available space
//         />
//       </div>

//       {search && (
//         <div className="position-absolute bg-light border rounded shadow-lg z-index-100 mt-1"
//              style={{ width: '100%' }} // Adjust width to match the input
//         >
//           {filteredData.length > 0 ? (
//             filteredData.map((item) => (
//               <div
//                 key={item.id}
//                 className="p-2 cursor-pointer d-flex align-items-center border-bottom"
//                 onClick={() => navigate(`/productinfo/${item.id}`)}
//               >
//                 <img className="w-25 h-25 me-2 rounded" src={item.productImageUrl} alt={item.title} />
//                 <span>{item.title}</span>
//               </div>
//             ))
//           ) : (
//             <div className="d-flex justify-content-center align-items-center p-3">
//               <img className="w-50" src="/no-results.png" alt="No results" />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;



















// import { useContext, useState, useEffect, useMemo } from "react";
// import myContext from "../../context/myContext";
// import { useNavigate } from "react-router";
// import debounce from "lodash.debounce";

// const SearchBar = () => {
//   const context = useContext(myContext);
//   const { getAllProduct } = context;
//   const [search, setSearch] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Debounced Filter Function: A debounced function is created to filter the getAllProduct
//   // array based on a user's search input. It waits 300 milliseconds after the user stops typing before executing,
//   // which prevents excessive filtering operations.
//   const debouncedFilter = useMemo(() => debounce((query) => {
//     setLoading(true);
//     if (getAllProduct) {
//       const results = getAllProduct.filter((obj) =>
//         obj.title.toLowerCase().includes(query.toLowerCase())
//       ).slice(0, 8);
//       setFilteredData(results);
//     }
//     setLoading(false);
//   }, 300), [getAllProduct]);

//   useEffect(() => {
//     if (!getAllProduct) {
//       console.error("Product data is not available.");
//       return;
//     }
//     debouncedFilter(search);
//     return () => {
//       debouncedFilter.cancel();
//     };
//   }, [search, getAllProduct, debouncedFilter]);

//   return (
//     <div className="position-relative">
//       <div className="d-flex justify-content-center mb-2">
//         <input
//           type="text"
//           placeholder="Search here"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="form-control w-75"
//           aria-label="Search products"
//         />
//       </div>

//       {loading && <div className="text-center">Loading...</div>}

//       {search && (
//         <div className="position-absolute bg-light w-75 border rounded shadow-lg z-index-100 mt-1">
//           {filteredData.length > 0 ? (
//             filteredData.map((item) => (
//               <div
//                 key={item.id}
//                 className="p-2 cursor-pointer d-flex align-items-center border-bottom"
//                 onClick={() => navigate(`/productinfo/${item.id}`)}
//               >
//                 <img
//                   className="w-25 h-25 me-2 rounded"
//                   src={item.productImageUrl}
//                   alt={item.title}
//                 />
//                 <span>{item.title}</span>
//               </div>
//             ))
//           ) : (
//             <div className="d-flex justify-content-center align-items-center p-3">
//               <img className="w-50" src="/no-results.png" alt="No results" />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

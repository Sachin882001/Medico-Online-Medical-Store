import { useNavigate } from "react-router";
import "../../App.css";
const category = [
  {
    id: "1",
    image: "/drugs.png",
    name: "drugs",
  },
  {
    id: "2",
    image: "/injection.png",
    name: "injection",
  },
  {
    id: "3",
    image: "sun-block.png",
    name: "cosmetic",
  },
  {
    id: "4",
    image: "homeopathy.png",
    name: "homeo",
  },
  {
    id: "5",
    image: "pain-relief.png",
    name: "pain-relief",
  },
  {
    id: "6",
    image: "lab-equipment.png",
    name: "devices",
  },
  {
    id: "7",
    image: "multivitamin.png",
    name: "vitamins",
  },
  {
    id: "8",
    image: "first-aid-kit.png",
    name: "first-Aid",
  },
];

const Category = () => {
  const navigate = useNavigate();

  return (

    <div className="container mt-5">
  <div className="d-flex justify-content-center">
    <div className="d-flex flex-nowrap overflow-auto">
      {category.map((item, index) => (
        <div key={index} className="p-2 text-center">
          <div
            onClick={() => navigate(`/category/${item.name}`)}
            className="d-flex justify-content-center align-items-center rounded-circle bg-info category-item cursor-pointer mb-2"
            style={{ width: "4rem", height: "4rem", maxWidth: "6rem" }}
          >
            <img src={item.image} alt={item.name} className="img-fluid category-image" />
          </div>
          <h5 className="text-muted">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h5>
        </div>
      ))}
    </div>
  </div>
</div>

    // <div className="container mt-5">
    //   <div className="d-flex overflow-auto">
    //     <div className="d-flex flex-nowrap">
    //       {category.map((item, index) => (
    //         <div key={index} className="p-2">
    //           <div
    //             onClick={() => navigate(`/category/${item.name}`)}
    //             className="d-flex justify-content-center align-items-center rounded-circle bg-info category-item cursor-pointer mb-2"
    //             style={{ width: "4rem", height: "4rem", maxWidth: "6rem" }}
    //           >
    //             <img src={item.image} alt={item.name} className="img-fluid category-image" />
    //           </div>
    //           <h5 className="text-center text-muted">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h5>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Category;

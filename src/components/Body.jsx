import React from "react";
// import Footer
import Banner from "./inner_components_index/Banner";
import CategoryWrap from "./inner_components_index/CategoryWrap";
import TopSellingProducts from "./inner_components_index/TopSellingProducts";
import BonelessCuts from "./inner_components_index/BonelessCuts";
import AboutUs from "./inner_components_index/AboutUs";
import Meetgram from "./inner_components_index/Meetgram";
import Meetgraminfo from "./inner_components_index/Meetgraminfo";
import Testimonials from "./inner_components_index/Testimonials";
// import OffWrap from "./inner_components_index/OffWrap";
import { useNavigate } from "react-router-dom";
function Body({ categoryChoice }){
  const navigate=useNavigate();
  const handleCategoryChoice = (categoryName) => {
    categoryChoice(categoryName);
    navigate(`/category/${categoryName}`);
  };
    return (
        <div>
      <Banner />
      <CategoryWrap onCategoryChoice={handleCategoryChoice}/>
      <TopSellingProducts />
      <BonelessCuts />
      <AboutUs />
      <Meetgram />
      <Meetgraminfo />
      <Testimonials />
      {/* <OffWrap /> */}
        </div>
    )
}

export default Body;
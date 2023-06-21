import React from "react";
// import Footer
import Banner from "./inner_components_index/Banner";
import Category from "./inner_components_index/Category";
import TopSellingProducts from "./inner_components_index/TopSellingProducts";
import BonelessCuts from "./inner_components_index/BonelessCuts";
import AboutUs from "./inner_components_index/AboutUs";
import Meetgram from "./inner_components_index/Meetgram";
import Meetgraminfo from "./inner_components_index/Meetgraminfo";
import Testimonials from "./inner_components_index/Testimonials";
import OffWrap from "./inner_components_index/OffWrap";
import products from "../admin";

function Body(){
    return (
        <div>
      <Banner />
      <Category />
      <TopSellingProducts products={products} />
      <BonelessCuts />
      <AboutUs />
      <Meetgram />
      <Meetgraminfo />
      <Testimonials />
      <OffWrap />
        </div>
    )
}

export default Body;
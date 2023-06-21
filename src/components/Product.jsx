import React from "react";
import RedBackgroundWrap from "./inner_components_category/RedBackgroundWrap";
import ProductWrap from "./inner_component_product/ProductWrap";
import MinibitsWrap from "./inner_component_product/MinibitsWrap";
import Sourcing from "./inner_component_product/Sourcing";
import TheWay from "./inner_component_product/TheWay";
import WayWrap from "./inner_component_product/WayWrap";
import Banner from "./inner_components_index/Banner";
function Product(){

    return (
        <div>
        <Banner />
        <RedBackgroundWrap />
        <ProductWrap />
        <MinibitsWrap />
        <Sourcing />
        <TheWay />
        <WayWrap />
        </div>
    );

}

export default Product;
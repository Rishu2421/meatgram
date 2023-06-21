import React from "react";
import { ButtonWrap } from "./inner_components_category/ButtonWrap";
import Banner from "./inner_components_index/Banner";
import RedBackgroundWrap from "./inner_components_category/RedBackgroundWrap";
import { ListImageWrap } from "./inner_components_category/ListImageWrap";
import { ImageListWrap } from "./inner_components_category/ImageListWrap";
// import { YellowBackground } from "./inner_components_category/YellowBackground";
import ChickenProductComponent from "./inner_components_category/ChickenProductComponent";
import CategoryInfoTextComponent from "./inner_components_category/CategoryInfoTextComponent";

function Category(){
    return (
        <div>
            <Banner />
            <RedBackgroundWrap />
            <ListImageWrap />
            <ImageListWrap />
            <ButtonWrap />
            <ChickenProductComponent />
            {/* <YellowBackground /> */}
            <CategoryInfoTextComponent />
        </div>
    )    
}

export default Category;
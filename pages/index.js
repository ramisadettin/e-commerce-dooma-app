import { useContext, useEffect } from "react";
import { NavCategoriesContext } from "../store/nav-categories-context";
import { SettingsContext } from "../store/settings-context";

import getProps from "../back-end/PropsGetters/home-page";
import Carousal from "../components/carousals/home-page-carousals/Carousal";
import Showcase from "../components/home-page/showcase/Showcase";
import MainCategories from "../components/categories/MainCategories";
import ElementWrapper from "../components/layout/element-wrapper/ElementWrapper";

export default function Home(props) {
  
  const putNavCategories = useContext(NavCategoriesContext).putNavCategories;
  const putSettings = useContext(SettingsContext).putSettings

  
  // get categories
  const navCategories = props.navCategories

  // get settings
  const siteSettings = props.siteSettings

  // dispaly0 data
  const display0_dataArray = props.display0;

  // dispaly1 data
  const display1_dataArray = props.display1;

  // showcase photos array
  const showcasePhotos = siteSettings && siteSettings.filter((setting) => {
    return setting.component_id === 2
  })


  useEffect(() => {
    if (navCategories) putNavCategories(navCategories);
    if (siteSettings) putSettings(siteSettings)
  }, [putNavCategories, putSettings, siteSettings, navCategories]);

  return (
    <>
      {/* showcase */}
      <ElementWrapper>
        <Showcase imagesUrlArray={showcasePhotos}/>
      </ElementWrapper>

      {/* display 0 */}
      <ElementWrapper>
        <Carousal width={400} height={500} dataArray={display0_dataArray} />
      </ElementWrapper>

      {/* display 1 */}
      <ElementWrapper>
        <MainCategories dataArray={display1_dataArray}/>
      </ElementWrapper>

      {/* display 0 */}
      <ElementWrapper>
        <Carousal width={400} height={500} dataArray={display0_dataArray} />
      </ElementWrapper>
    </>
  );
}

export async function getStaticProps() {
  try {
    // get main page props and categories
    const props = await getProps();
    return {
      props,
    };
  } catch (e) {
    console.log(e.message);
    return {
      notFound: true,
    };
  }
}

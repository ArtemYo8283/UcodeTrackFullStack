import React from "react";

import anonymousMask from '../../assets/Layout/anonguy.png';
import { BoxComp2, TypographyComp, ContainerComp } from '../../styles/FooterStyle'

const  Footer  = () => {
  return (
  
      <ContainerComp className={localStorage.getItem('themeMode') === 'dark'  ? "Dark" : "Light"}>
        <BoxComp2>
          <div>
            <img className="fit-picture" src={anonymousMask} alt="anonLogo"></img>
          </div>
          <TypographyComp variant="caption">
            Webster © 2023 Anonymous team. All rights reserved
          </TypographyComp>
        </BoxComp2>
      </ContainerComp>
  );
}

export default Footer;
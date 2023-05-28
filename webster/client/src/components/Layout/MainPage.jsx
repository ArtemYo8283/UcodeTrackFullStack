import React, { useRef } from "react";
import mainPageElement from '../../assets/Layout/mainPageElementAnon.png';
import mainPageElementLight from '../../assets/Layout/mainPageElementAnonLight.png';
import websterLogoLight from '../../assets/Layout/LogoLight.png'
import websterLogoDark from '../../assets/Layout/LogoDark.png'
import { Container, TextBlock, ButtonDiv, StartButton } from '../../styles/MainPageStyle';
import sound1 from './sounds/sound1.mp3'
import sound2 from './sounds/sound2.mp3'
export const MainPage = () => {
  const audioRef = useRef(null);
  
  const playSound = () => {
    audioRef.current.play();
  };
  return (
    <Container>
      <TextBlock>
        {
          localStorage.getItem('themeMode') === 'dark' ?
            <img className="fit-picture" src={websterLogoDark} alt="websterLogo" width={350}></img>
            :
            <img className="fit-picture" src={websterLogoLight} alt="websterLogo" width={350}></img>
        }
      </TextBlock>
      {
        localStorage.getItem('themeMode') === 'dark' ?
          <img className="fit-picture" src={mainPageElement} alt="mainPageWallPaper"></img>
          :
          <img className="fit-picture" src={mainPageElementLight} alt="mainPageWallPaper"></img>
      }
      <ButtonDiv>
        <StartButton
          className={localStorage.getItem('themeMode') === 'dark' ? "Dark" : "Light"}
          variant="outlined"
          onClick={playSound}
        >Start</StartButton>
        <audio ref={audioRef} src={sound1} />
      </ButtonDiv>
    </Container>
  );
}

export default MainPage;
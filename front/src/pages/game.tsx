import { useState, useEffect } from 'react';
import ninja from '../images/ninja.png';
import place from '../images/place.jpg';
import place_mini1 from '../images/place_mini1.jpg';
import place_mini2 from '../images/place_mini2.jpg';
import { useStopwatch } from "react-timer-hook";
import '../game.css'
export function GamePage(): JSX.Element {
  const [clickCount, setClickCount] = useState(0);
  const {seconds, minutes, isRunning, start, pause, reset} = useStopwatch({ autoStart: false });
  const [size, setSize] = useState({ 'width': window.innerWidth, 'height': window.innerHeight });
  window.addEventListener('resize', function () {
    setSize({ 'width': window.innerWidth, 'height': window.innerHeight });
  }, true);
 
  useEffect(() => {
    if (clickCount === 5) {
      pause(); // 5回クリックされたらストップウォッチを停止
    } else {
      placeHiddenPhoto(); // それ以外は画像を配置
    }
  }, [clickCount, pause, seconds, minutes, isRunning, start, reset]);

  const placeHiddenPhoto = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 150;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    console.log(randomX,randomY)
    setPhotoPosition({
      left: randomX + 'px',
      top: randomY + 'px',
    });
    setHidden(true);
  };
  

  const [photoPosition, setPhotoPosition] = useState({
    left: '0px',
    top: '0px',
  });

  const [hidden, setHidden] = useState(false);

  const foundPhoto = () => {
    setClickCount((prevCount) => prevCount + 1);
    
    if (clickCount === 0) {
      start() ;
    }else {
      if (clickCount === 4) {
        pause(); 
        // おめでとうのページに移動するなどの処理を追加
      } else {
        // setHidden(false);
        placeHiddenPhoto();
      }
    }
    
  };
  
  return (
    <div className="App">
      <div>
        {clickCount === 5 && (
        <>
        <b>おめでとう！{seconds}秒で5回クリックしました！！</b>
        <p>ストップウォッチ: {seconds}秒</p>
        </>
        )}
        {clickCount < 5 && 
        <h3>
          にんじゃわんこを{5 - clickCount}回クリックしてください！
        <p>{seconds}秒</p>
        </h3>}
      </div>
      <main className="main-background">
        <div style={{width: "100vw", marginLeft:"calc(-50vw + 50%)"}}><img style={{width:"100%"}} src={size.width > 400 * 2 ? size.width > 500 * 2 ? place_mini2 : place_mini1 : place}/></div>
        <div className="hidden-photo"
        style={{ ...photoPosition, display: hidden ? 'block' : 'none' }}
        onClick={foundPhoto} > 
          <img src={ninja}/>
        </div>
      </main>
    </div>   
  );
}

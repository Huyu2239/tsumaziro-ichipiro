import { useState, useEffect } from 'react';
import ninja from '../images/ninja.png';
import place from '../images/place.jpg';
import { useStopwatch } from "react-timer-hook";
import '../game.css'
export function GamePage(): JSX.Element {
  const [clickCount, setClickCount] = useState(0);
  const { seconds, minutes, isRunning, start, pause, reset } =useStopwatch({ autoStart: false });
 
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
        <img src={place}/>
        <div className="hidden-photo"
        style={{ ...photoPosition, display: hidden ? 'block' : 'none' }}
        onClick={foundPhoto} > 
          <img src={ninja}/>
        </div>
      </main>
    </div>   
  );
}

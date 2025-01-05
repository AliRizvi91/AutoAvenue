import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/Images/img1C.png"
          alt="Midnight Shadow"
        />
        <Carousel.Caption className='S-Head' style={{position:"absolute", top:"5rem",left:"2rem" ,width:"45rem", color:"white" , textAlign:"left" }}>
          <h1>Midnight Shadow</h1>
          <p>In the depths of the night, the sleek silhouette of the "Midnight Shadow" prowls the streets with an air of mystery.<br/> Its obsidian paint glistens under the moonlight, embodying an enigmatic allure that captivates all who catch a glimpse of its fleeting presence.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/Images/img2C.png"
          alt="Racine Racer"
        />
        <Carousel.Caption className='S-Head' style={{position:"absolute", top:"1rem",left:"2rem",width:"45rem" , color:"white" , textAlign:"left"}}>
        <h1>Racine Racer</h1>
          <p>With the spirit of speed coursing through its veins, the "Racine Racer" tears down the asphalt, leaving a trail of exhilaration in its wake.<br/> This sleek machine embodies the essence of velocity, its name whispered in awe by all who witness its lightning-fast maneuvers on the open road.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/Images/img3C.png"
          alt="Velocity Vanguard"
        />
        <Carousel.Caption className='S-Head ' id="img3C" style={{position:"absolute", top:"5rem",left:"2rem" ,width:"45rem", color:"white" , textAlign:"left" }}>
        <h1>Velocity Vanguard</h1>
          <p>
          With the roar of its engine as a symphony, the "Velocity Vanguard" streaks across the track, a relentless force of speed and precision.<br/> Every curve conquered, every straightaway embraced, this racing marvel embodies the epitome of performance, leaving competitors trailing in its wake with each lightning-fast lap.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
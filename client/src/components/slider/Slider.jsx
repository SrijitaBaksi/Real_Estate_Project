import { useState } from "react";
import "./Slider.scss";

function Slider({ images }) {
  console.log("Images in Slider:", images); // Debugging

  const [imageIndex, setImageIndex] = useState(null);  // ✅ Keep it null initially


  const changeSlide = (direction) => {
    if (!images || images.length === 0) return;

    if (direction === "left") {
      setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
    } else {
      setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);
    }
    console.log(imageIndex)
    
  };

  return (
    <div className="slider">
      {imageIndex !== null && images.length > 0 && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="Left Arrow" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex] || "/fallback.jpg"} alt="Property" />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" className="right" alt="Right Arrow" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>X</div>
        </div>
      )}
      <div className="bigImage">
        <img src={images?.[0] || "/fallback.jpg"} alt="Thumbnail" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;

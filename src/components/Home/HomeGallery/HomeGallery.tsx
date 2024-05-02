"use client";
import Image from "next/image";
import styles from "./HomeGallery.module.scss";
import images from "./Gallery";

const tiltEffectSettings = {
  max: 3, // max tilt rotation (degrees (deg))
  perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
  scale: 1, // transform scale - 2 = 200%, 1.5 = 150%, etc..
  speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
  easing: "cubic-bezier(.03,.98,.52,.99)" // easing (transition-timing-function) of the enter/exit transition
};

const HomeGallery = () => {
  return (
    <div className={styles.grid}>
      { images.map((image) => {
        return (
          <div className={styles.imageCont} key={image.id} 
          onMouseMove={(e) => {
          const card = e.currentTarget;
          const cardWidth = card.offsetWidth;
          const cardHeight = card.offsetHeight;
          const centerX = card.offsetLeft + cardWidth/2;
          const centerY = card.offsetTop + cardHeight/2;
          const mouseX = e.clientX - centerX;
          const mouseY = e.clientY - centerY;
          const rotateXUncapped = (+1)*tiltEffectSettings.max*mouseY/(cardHeight/2);
          const rotateYUncapped = (-1)*tiltEffectSettings.max*mouseX/(cardWidth/2);
          const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                          (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
          const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                          (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);

          card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                                  scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
          }}

          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // @ts-ignore
            clearTimeout(card.transitionTimeoutId)
            card.style.transition = `transform 3000ms cubic-bezier(.03,.98,.52,.99)`;
            // @ts-ignore
            card.transitionTimeoutId = setTimeout(() => {
              card.style.transition = "";
            }, 3000);
          }}

          onMouseEnter={(e) => {
            const card = e.currentTarget;
            // @ts-ignore
            clearTimeout(card.transitionTimeoutId)
            card.style.transition = `transform 3000ms cubic-bezier(.03,.98,.52,.99)`;
            // @ts-ignore
            card.transitionTimeoutId = setTimeout(() => {
              card.style.transition = "";
            }, 3000);
          }}

          style={{
            flex: image.flex
          }}>
            <Image src={`/images/homepage/gallery/${image.id}.webp`} alt="Gallery" fill className={styles.img} loading="eager" />
          </div>
        )
      })}
    </div>
  )
}

export default HomeGallery;
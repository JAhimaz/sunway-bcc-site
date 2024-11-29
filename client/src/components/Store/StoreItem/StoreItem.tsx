"use client";
import Image from "next/image";
// import Image from "next/image";
import styles from "./StoreItem.module.scss";
import Texts from "@/components/Atoms/Texts";
import { useState } from "react";

const devImages = [
  {
    id: 1,
    src: "https://mir-s3-cdn-cf.behance.net/projects/404/5fafb5182185477.Y3JvcCwzMDAwLDIzNDYsMCww.jpg",
    alt: "id-image-1"
  },
  {
    id: 2,
    src: "https://img.freepik.com/premium-psd/psd-tshirt-front-mockup_78090-734.jpg",
    alt: "id-image-2"
  },
  {
    id: 3,
    src: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA3LzQ2MS1mZWxpeC0xNC1jYXJkLW1vY2t1cC5qcGc.jpg",
    alt: "id-image-3"
  }
]

const StoreItem = () => {

  const [currentImage, setCurrentImage] = useState<string>(devImages[0].src);
  const [tempStoredImage, setTempStoredImage] = useState<string | undefined>(undefined);

  return (
    <article className={styles.storeItem} onMouseLeave={() => {
      setCurrentImage(devImages[0].src)
    }}>
      
      {/* Top Section For Main Photo */}
      <section className={styles.itemPhotoSelected}>
        <Image className={styles.photo} src={currentImage} alt="Item Photo" fill />
        <div className={styles.itemPrice}>
          {/* USD Price */}
          <Texts fontSize="md">$100.00 USD</Texts>
          <Texts fontSize="sm" color="var(--text-light)">MYR 435.00</Texts>
          {/* Malaysian Price */}
        </div>
      </section>
      <section className={styles.itemBottomRow}>
        <section className={styles.itemImages}>
          { devImages.map((image) => (
            <div className={styles.itemImage} key={image.id} 
            onClick={() => {
              setCurrentImage(image.src);
            }}>
              <Image className={styles.photo} src={image.src} alt={image.alt} fill />
            </div>
          ))}
        </section>
        <section className={styles.itemDetails}>
  
        </section>
      </section>
      {/* Bottom Section for Price and Buy now button */}
      {/* Split this section by Row, one for the 3 images and price */}

      {/* Fake Borders for On Hover */}
      <div className={styles.fakeBorderLeft} />
      <div className={styles.fakeBorderRight} />
      <div className={styles.fakeBorderTop} />
      <div className={styles.fakeBorderBottom} />
    </article>
  )
}

export default StoreItem;
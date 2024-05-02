"use client";
import images from "../Gallery";
import styles from "./HomeGalleryMobile.module.scss";
import Image from "next/image";

const HomeGalleryMobile = () => {
  return (
    <div className={styles.grid}>
      { images.map((image) => {
        return (
          <div className={styles.imageCont} key={image.id}>
            <Image src={`/images/homepage/gallery/${image.id}.webp`} alt="Gallery" fill className={styles.img} loading="eager" />
          </div>
        )
      })}
    </div>
  )
}

export default HomeGalleryMobile;
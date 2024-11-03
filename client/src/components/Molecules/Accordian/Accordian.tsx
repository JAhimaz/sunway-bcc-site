"use client"
import Texts from '@/components/Atoms/Texts';
import styles from './Accordian.module.scss';
import {FC, ReactNode, useEffect, useState} from 'react';
import { Icon } from '@/utils/Icons';

type AccordianProps = {
  title: string;
  children: ReactNode;
}

const Accordian: FC<AccordianProps> = ({ title, children }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.container}>
      <section className={styles.title} onClick={() => setIsOpen(!isOpen)}>
        <Texts fontSize='md' className={styles.text} color={
          isOpen ? 'var(--text)' : 'var(--text-light)'
        }>{ title }</Texts>
        <Icon icon="arrowRight" className={styles.arrow} style={{
          transform: isOpen ? 'rotate(90deg)' : 'rotate(45deg)'
        }} />
      </section>
      { isOpen && (
        <section className={styles.content}>
          { children }
        </section>
      ) }
    </section>
  )
}

export default Accordian;
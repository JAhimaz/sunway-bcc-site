"use client"
import styles from './DropdownMenu.module.scss';
import {FC, ReactNode, useEffect, useState} from 'react';

type DropdownMenuProps = {
  items?: Array<{
    id: string;
    text: string;
    isLink: boolean;
    link?: string;
    func?: () => void;
  }>;
  children: ReactNode;
  width?: string;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ items, children }) => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <section className={styles.container} onMouseLeave={() => setIsOpen(false)} onMouseEnter={() => setIsOpen(true)}>
      { children }
      { isOpen && (
        <section className={styles.dropdownMenu}>
          
        </section>
      ) }
    </section>
  )
}

export default DropdownMenu;
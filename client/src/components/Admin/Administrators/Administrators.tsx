"use client"

import Texts from '@/components/Atoms/Texts';
import styles from './Administrators.module.scss';
import { Avatar } from 'connectkit';
import { Icon } from '@/utils/Icons';
import { useEffect, useState } from 'react';
import GetAdministrators from '@/libs/@server/admin/GetAdministrators';
import { useAccount } from 'wagmi';
import Loader from '@/components/Loader/Loader';

type Admin = {
  _id: string;
  name: string;
  address: `0x${string}`;
}

const Administrators = () => {

  const [ loading, setLoading ] = useState(true);
  const [ admins, setAdmins ] = useState<Admin[]>([]);

  const { address } = useAccount();

  // Fetch admins
  useEffect(() => {
    if(!address) return;

    setLoading(true)

    GetAdministrators(address).then((data) => {
      setAdmins(data)
      setLoading(false)
    })

  }, [address])

  return (
    <section className={styles.container}>
      <Texts fontSize='sm' color='var(--text-light)'>Add Administrator</Texts>
      <section className={styles.inputSection}>
        <input className={styles.input} />
        <button className={styles.addButton}>Give Administrator</button>
      </section>
      <Texts fontSize='sm' color='var(--text-light)'>List of Current Administrators</Texts>
      <section id="admin_list" className={styles.adminList}>
        { loading && <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem'
        }}>
          <Loader />
        </div>}
        {/* Array of 10 */}
        { admins && admins.map((admin, i) => (
          <section key={i} className={styles.adminItem}>
            <Avatar size={20} address={admin.address} />
            <Texts fontSize='sm' color='var(--text)'>{admin.name}</Texts>
            <Texts fontSize='xs' color='var(--text-light)'>{admin.address}</Texts>
            <Icon icon="delete" onClick={() => {
              // Delete admin
            }} className={styles.deleteIcon} />
          </section>
        )) }
      </section>
    </section>
  )
}

export default Administrators;
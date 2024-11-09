"use client"

import Texts from '@/components/Atoms/Texts';
import styles from './Administrators.module.scss';
import { Avatar } from 'connectkit';
import { Icon } from '@/utils/Icons';
import { FC, useEffect, useState } from 'react';
import GetAdministrators from '@/libs/@server/admin/GetAdministrators';
import { useAccount } from 'wagmi';
import Loader from '@/components/Loader/Loader';
import { useSignMessage } from 'wagmi'
import { config } from '@/utils/providers/Web3Provider';
import { User } from '@/libs/@server/user/GetUser';
import SetAdministrator from '@/libs/@server/admin/SetAdministrator';
import DeleteAdministrator from '@/libs/@server/admin/DeleteAdministrator';

type Admin = {
  _id: string;
  name: string;
  address: `0x${string}`;
}

type AdminProps = {
  userDetails: User;
}

const Administrators: FC<AdminProps> = ({ userDetails }) => {

  const [ loading, setLoading ] = useState(true);
  const [ admins, setAdmins ] = useState<Admin[]>([]);

  const [ newAddress, setNewAddress ] = useState<string>('');
  const [ success, setSuccess ] = useState({
    visible: false,
    message: '',
    isError: false
  });


  const { address } = useAccount();

  // Fetch admins
  useEffect(() => {
    if(!address) return;

    setLoading(true)

    GetAdministrators(address, userDetails.key!).then((data) => {
      setAdmins(data)
      setLoading(false)
    })

  }, [address, userDetails.key])

  const GiveAdministrator = async () => {
    if(!address) return;

    await SetAdministrator(address, userDetails.key!, newAddress).then(async (result) => {
      if(result.error) {
        setSuccess({
          visible: true,
          message: result.error.message,
          isError: true
        })
      } else {
        setSuccess({
          visible: true,
          message: `Success! ${newAddress} is now an Administrator`,
          isError: false
        })
  
        await GetAdministrators(address, userDetails.key!).then((data) => {
          setAdmins(data)
        })
      }
    }).catch((err) => {
      setSuccess({
        visible: true,
        message: err,
        isError: true
      })

    }).finally(async () => {
      setNewAddress('');

      setTimeout(() => {
        setSuccess({
          visible: false,
          message: '',
          isError: false
        })
      }, 5000)
    })
    return;
  }

  const RemoveAdministrator = async (addressToDelete: string) => {
    if(!address || !addressToDelete) return;
    // Delete admin

    await DeleteAdministrator(address, userDetails.key!, addressToDelete).then(async (result) => {
      if(result.error) {
        console.log(result.error.message);
      } else {
        await GetAdministrators(address, userDetails.key!).then((data) => {
          setAdmins(data)
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }


  return (
    <section className={styles.container}>
      <Texts fontSize='sm' color='var(--text-light)'>Add Administrator</Texts>
      <section className={styles.inputSection}>
        <input className={styles.input} onChange={(e) => setNewAddress(e.target.value)} value={newAddress} />
        <button className={styles.addButton} onClick={() => GiveAdministrator()}>Give Administrator</button>
      </section>
      { success.visible && <Texts fontSize='xs' color={success.isError ? 'var(--error)' : 'var(--highlight)'}>{success.message}</Texts> }
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
            { admin.address !== userDetails.address &&
            <Icon icon="delete" onClick={() => {
              RemoveAdministrator(admin.address)
            }} className={styles.deleteIcon} />
            }
          </section>
        )) }
      </section>
    </section>
  )
}

export default Administrators;
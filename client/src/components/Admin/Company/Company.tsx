"use client"

import styles from './Company.module.scss';
import { FC, useState } from 'react';
import { User } from '@/libs/@server/user/GetUser';
import CreateCompany from './CreateCompany/CreateCompany';
import EditCompany from './EditCompany/EditCompany';

export type CompanyAdminProps = {
  userDetails: User;
}

export type CompanyDetails = {
  _id?: string;
  name: string;
  logo?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  discord?: string;
  website: string;
  description: string;
  headquarters?: string;
}

const CompanyAdmin: FC<CompanyAdminProps> = ({
  userDetails
}) => {

  const [ page, setPage ] = useState<'new' | 'edit'>('new');
  const [ loading, setLoading ] = useState(false);

  return (
    <section className={styles.container}>
    <div id="button_rows_company" className={styles.buttonRows}>
      <button className={
        page === 'new' ? styles.selected : styles.button
      } onClick={() => setPage('new')}>Create New Company</button>
      <button className={
        page === 'edit' ? styles.selected : styles.button
      } onClick={() => setPage('edit')}>Edit Existing Company</button>
    </div>

    {
      page === "new" ? <CreateCompany userDetails={userDetails} /> : 
      page === "edit" ? <EditCompany userDetails={userDetails} /> : null
    }

    </section>
  )

}

export default CompanyAdmin;
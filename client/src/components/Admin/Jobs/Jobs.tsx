"use client"

import Texts from '@/components/Atoms/Texts';
import styles from './Jobs.module.scss';
import { FC, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Loader from '@/components/Loader/Loader';
import { User } from '@/libs/@server/user/GetUser';
import Select from '@/components/Molecules/Select/Select';
import { CompanyDetails } from '../Company/Company';

type JobsAdminProps = {
  userDetails: User;
}


export type JobDetails = {
  company: CompanyDetails | undefined;
}

// TODOS:
// - Create a New Company
// - Delete a Company
// - Select Existing Company
// - Implement Update button if a user selects a company, that way we can update any information
// - Create a New Job
// 

const JobsAdmin: FC<JobsAdminProps> = () => {

  const [ loading, setLoading ] = useState(false);
  const [ jobDetails, setJobDetails ] = useState<JobDetails>({
    company: undefined
  });

  if(loading) {
    return (
      <section className={styles.container} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px'
      }}>
          <Loader />
      </section>
    )
  }

  return (
    <section className={styles.container}>
      <Texts fontSize='sm' color='var(--text-light)'>Job</Texts>
    </section>
  )

}

export default JobsAdmin;
"use client"
import Texts from '@/components/Atoms/Texts';
import styles from './CreateCompany.module.scss';
import Loader from '@/components/Loader/Loader';
import { default as NextImage } from 'next/image';
import { CompanyAdminProps, CompanyDetails } from '../Company';
import { FC, useEffect, useState } from 'react';
import { default as CreateCompanyAPI } from '@/libs/@server/admin/Company/CreateCompany';

const CreateCompany: FC<CompanyAdminProps> = ({
  userDetails
}) => {
    const [ companyDetails, setCompanyDetails ] = useState<CompanyDetails>({
      name: '',
      website: '',
      description: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      github: '',
      discord: ''
    });
    const [ message, setMessage ] = useState({
      visible: false,
      message: '',
      isError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setCompanyDetails({ ...companyDetails, [name]: value });
    }

    const Submit = async () => {
      // Check if all required fields are filled
      if (!companyDetails.name || !companyDetails.description) {
        setMessage({
          visible: true,
          message: 'Please fill in all required fields',
          isError: true
        });
        return;
      }

      // Check if website is a valid URL
      if (companyDetails.website) {
        const urlRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        if (!urlRegex.test(companyDetails.website)) {
          setMessage({
            visible: true,
            message: 'Invalid website URL',
            isError: true
          });
          return;
        }
      }

      await CreateCompanyAPI({
        address: userDetails.address,
        key: userDetails.key!,
        company: companyDetails
      }).catch((err) => {
        setMessage({
          visible: true,
          message: err.message,
          isError: true
        });
      });

      // Reset form
      setCompanyDetails({
        name: '',
        website: '',
        description: '',
        headquarters: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        github: '',
        discord: ''
      });

      // Show success message
      setMessage({
        visible: true,
        message: 'Company created successfully',
        isError: false
      });
    }

    return (
        <section className={styles.container}>
          <Texts fontSize='sm' color='var(--text-light)'>Company Name</Texts>
          <input className={styles.input} onChange={(e) => handleChange(e)} name="name" placeholder='e.g Sunway Blockchain' value={companyDetails.name} />

          <Texts fontSize='sm' color='var(--text-light)'>Description</Texts>
          <textarea className={styles.textarea} placeholder={"Enter a description of your company"} onChange={(e) => handleChange(e)} name="description" value={companyDetails.description} />
      
          <Texts fontSize='sm' color='var(--text-light)'>Company Website</Texts>
          <input className={styles.input} onChange={(e) => handleChange(e)} name="website" placeholder='e.g https://sunwayblockchain.com' value={companyDetails.website} />
          <Texts fontSize='sm' color='var(--text-light)'>Headquarters</Texts>
          <input className={styles.input} onChange={(e) => handleChange(e)} name="headquarters" placeholder='e.g Sunway University, Malaysia' value={companyDetails.headquarters} />
        
          <Texts fontSize='sm' color='var(--text-light)'>Company Socials</Texts>
          {/* Socials */}  
          <div className={styles.socialRow}>
            <Texts fontSize="sm" color="var(--text-light)">
              Twitter
            </Texts>
            <input
              className={styles.input}
              onChange={(e) => handleChange(e)}
              name="twitter"
              value={companyDetails.twitter}
            />
          </div>
          <div className={styles.socialRow}>
            <Texts fontSize="sm" color="var(--text-light)">
              LinkedIn
            </Texts>
            <input
              className={styles.input}
              onChange={(e) => handleChange(e)}
              name="linkedin"
              value={companyDetails.linkedin}
            />
          </div>
          <div className={styles.socialRow}>
            <Texts fontSize="sm" color="var(--text-light)">
              Instagram
            </Texts>
            <input
              className={styles.input}
              onChange={(e) => handleChange(e)}
              name="instagram"
              value={companyDetails.instagram}
            />
          </div>
          <div className={styles.socialRow}>
            <Texts fontSize="sm" color="var(--text-light)">
              GitHub
            </Texts>
            <input
              className={styles.input}
              onChange={(e) => handleChange(e)}
              name="github"
              value={companyDetails.github}
            />
          </div>
          <div className={styles.socialRow}>
            <Texts fontSize="sm" color="var(--text-light)">
              Discord
            </Texts>
            <input
              className={styles.input}
              onChange={(e) => handleChange(e)}
              name="discord"
              value={companyDetails.discord}
            />
          </div>
          <button className={styles.addButton} onClick={Submit}>Create Company</button>
          { message.visible && <Texts fontSize='xs' color={message.isError ? 'var(--error)' : 'var(--highlight)'}>{message.message}</Texts> }
        </section>
    )
}

export default CreateCompany;
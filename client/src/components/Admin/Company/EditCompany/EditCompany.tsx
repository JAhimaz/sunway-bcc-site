"use client"
import Texts from '@/components/Atoms/Texts';
import styles from './EditCompany.module.scss';
import Loader from '@/components/Loader/Loader';
import { default as NextImage } from 'next/image';
import { CompanyAdminProps, CompanyDetails } from '../Company';
import { FC, useEffect, useState } from 'react';
import Select from '@/components/Molecules/Select/Select';
import GetCompanies from '@/libs/@server/admin/Company/GetCompanies';
import UpdateCompany from '@/libs/@server/admin/Company/UpdateCompany';
import DeleteCompany from '@/libs/@server/admin/Company/DeleteCompany';

const EditCompany: FC<CompanyAdminProps> = ({
  userDetails
}) => {
    const [companies, setCompanies] = useState<CompanyDetails[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string | undefined>(undefined);
    const [ companyDetails, setCompanyDetails ] = useState<CompanyDetails>({
      _id: '',
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

    const handleSelectCompany = (id: string) => {
        // Set Company Details
        setSelectedCompany(id);
        const company = companies.find((company) => company._id === id);
        if (company) {
            setCompanyDetails(company);
        }
    }

    useEffect(() => {
        const fetchCompanies = async () => {
            const data = await GetCompanies(userDetails.address, userDetails.key!);
            setCompanies(data);
        }

        fetchCompanies();
    }, [userDetails.address, userDetails.key]);

    const Submit = async () => {
      // Update
      console.log(companyDetails);
      await UpdateCompany(userDetails.address, userDetails.key!, companyDetails).then((data) => {
        setMessage({
          visible: true,
          message: data.message,
          isError: data._code !== 200 ? true : false
        });
      });

      const data = await GetCompanies(userDetails.address, userDetails.key!);
      setCompanies(data);
    }

    const Delete = async () => {
      // Delete
      await DeleteCompany(userDetails.address, userDetails.key!, companyDetails._id!).then((data) => {
        setMessage({
          visible: true,
          message: data.message,
          isError: data._code !== 200 ? true : false
        });
      });

      // Clear
      setCompanyDetails({
        _id: '',
        name: '',
        website: '',
        description: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        github: '',
        discord: ''
      });
      setSelectedCompany(undefined);

      // Refetch
      const data = await GetCompanies(userDetails.address, userDetails.key!);
      setCompanies(data);
      
    }

    return (
        <section className={styles.container}>
          <Texts fontSize='sm' color='var(--text-light)'>Select a Company</Texts>
          <Select options={[
            { id: "", name: "Select a Company" },
            // Map through companies
            ...companies.map((company) => {
              return {
                id: company._id!,
                name: company.name
              }
            })
          ]}
          onChange={(value) => handleSelectCompany(value)}
          value={selectedCompany ? selectedCompany : ""}
          width='full'
          />
          { selectedCompany && (
          <>
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
            <button className={styles.addButton} onClick={Submit}>Update {companyDetails.name}</button>
            <button className={styles.deleteButton} onClick={Delete}>Delete {companyDetails.name}</button>
            { message.visible && <Texts fontSize='xs' color={message.isError ? 'var(--error)' : 'var(--highlight)'}>{message.message}</Texts> }
          </>
          )}
        </section>
    )
}

export default EditCompany;
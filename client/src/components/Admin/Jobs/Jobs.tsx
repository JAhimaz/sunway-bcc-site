"use client"

import Texts from '@/components/Atoms/Texts';
import styles from './Jobs.module.scss';
import { FC, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Loader from '@/components/Loader/Loader';
import { User } from '@/libs/@server/user/GetUser';
import Select from '@/components/Molecules/Select/Select';
import { CompanyDetails } from '../Company/Company';
import GetCompanies from '@/libs/@server/admin/Company/GetCompanies';
import { Icon } from '@/utils/Icons';
import CreateJob from '@/libs/@server/admin/Job/CreateJob';
import Required from '@/utils/Required';

type JobsAdminProps = {
  userDetails: User;
}


export type JobDetails = {
  companyId: string;
  jobTitle: string;
  jobDescription: string;
  jobUrl: string;
  minPay: number;
  maxPay: number;
  paymentSchedule: string;
  payCurrency: string; // 'USD' | 'EUR' | 'MYR' | 'SGD' | 'INR' | 'RMB';
  location: string;
  timezone: string;
  isRemote: string;
  jobType: string; // 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship' | 'Freelance';
  skill: string;
  tags: string[];
}


const JobsAdmin: FC<JobsAdminProps> = ({ userDetails }) => {

  const [ loading, setLoading ] = useState(false);
  const [ companies, setCompanies ] = useState<CompanyDetails[]>([]);
  const [ companySearch, setCompanySearch ] = useState<string>('');
  const [ jobDetails, setJobDetails ] = useState<JobDetails>({
    companyId: '',
    jobTitle: '',
    jobDescription: '',
    jobUrl: '',
    minPay: 0,
    maxPay: 0,
    paymentSchedule: '',
    payCurrency: '',
    location: '',
    timezone: '',
    isRemote: '',
    jobType: '',
    skill: '',
    tags: []
  });
  const [ message, setMessage ] = useState({
    visible: false,
    message: '',
    isError: false
  });
  const [ jobExternal, setJobExternal ] = useState<string>('joburl');

  useEffect(() => {
    const fetchCompanies = async () => {
        const data = await GetCompanies(userDetails.address, userDetails.key!);
        setCompanies(data);
    }

    fetchCompanies();
  }, [userDetails.address, userDetails.key]);

  const Submit = async () => {
    // We will do checks for all required items
    
    // Company ID
    const missingItems: { [key: string]: boolean } = {
      companyId: jobDetails.companyId === '',
      jobTitle: jobDetails.jobTitle === '',
      jobDescription: jobDetails.jobDescription === '',
      jobUrl: jobDetails.jobUrl === '',
      location: jobDetails.location === '',
      isRemote: jobDetails.isRemote === '',
      jobType: jobDetails.jobType === '',
      skill: jobDetails.skill === '',
    }

    // Check if any of the items are missing
    if (Object.values(missingItems).includes(true)) {
      setMessage({
        visible: true,
        // Clean up the text, turning isRemote to Is Remote
        message: `Please Enter the following fields: ${Object.keys(missingItems).filter(key => missingItems[key]).map(key => key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })).join(', ')}`,
        isError: true
      });
      return;
    }

    await CreateJob({
      job: {
        ...jobDetails,
        jobUrl: jobExternal === 'email' ? `mailto:${jobDetails.jobUrl}` : jobDetails.jobUrl
      },
      address: userDetails.address,
      key: userDetails.key!
    }).then((data) => {
      setMessage({
        visible: true,
        message: data.message,
        isError: data._code !== 200 ? true : false
      });

      // Reset the form
      setJobDetails({
        companyId: '',
        jobTitle: '',
        jobDescription: '',
        jobUrl: '',
        minPay: 0,
        maxPay: 0,
        paymentSchedule: '',
        payCurrency: '',
        location: '',
        timezone: '',
        isRemote: '',
        jobType: '',
        skill: '',
        tags: []
      });
    })
  }

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
      { message.visible && <Texts fontSize='xs' color={message.isError ? 'var(--error)' : 'var(--highlight)'}>{message.message}</Texts> }
      <Texts fontSize='sm' color='var(--text-light)'>Select Company (Please Choose from the List)<Required /></Texts>
      <section style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}> 
      <input
        className={styles.input}
        onChange={(e) => {
          setCompanySearch(e.target.value)
          // Reset the company ID
          setJobDetails({ ...jobDetails, companyId: '' })
        }}
        name="discord"
        value={companySearch}
      />
      { jobDetails.companyId ? (
        <Icon icon="check" style={{
          fill: 'var(--highlight)',
        }} />
      ) : (
        <Icon icon="cross" style={{
          fill: 'var(--error)',
        }} />
      ) }
      </section>
      {/* List out the companies based on the current based on the search of company Name */}
      {/* Map as a div, but only do this if the search is more than 3 characters */}
      { companySearch.length < 3 && 
        <Texts fontSize='sm' color='var(--text-light)'>Please enter at least <Texts fontSize='sm' color='var(--highlight)'>{3 - companySearch.length}</Texts> more characters</Texts>
      }
      {/* Map only first 5 suggestions */}
      <section className={styles.companySearchSection}>
      { (companySearch.length >= 3 && jobDetails.companyId === "" ) && companies.filter(company => company.name.toLowerCase().includes(companySearch.toLowerCase())).slice(0, 5).map(company => (
        (<div
          key={company._id}
          className={styles.companySearchTile}
          onClick={() => {
            setJobDetails({ ...jobDetails, companyId: company._id! })
            setCompanySearch(company.name)
          }}
        >
          <Texts fontSize='sm' className={styles.companyText} color='var(--text-light)'>{company.name}</Texts>
          <div className={styles.fillCompany} />
        </div>
        )
        // if length is 0, show text "No companies found"
      )) }
      </section>

      {/* Once a company ID is selected, show the rest of the fields */}
      { jobDetails.companyId && (
        <>
          <Texts fontSize='sm' color='var(--text-light)'>Job Title<Required /></Texts>
          <input className={styles.input} onChange={(e) => setJobDetails({ ...jobDetails, jobTitle: e.target.value })} placeholder='e.g Blockchain Developer' value={jobDetails.jobTitle} />
          <Texts fontSize='sm' color='var(--text-light)'>Job Description<Required /></Texts>
          <textarea className={styles.textarea} placeholder={"Enter a description of the job"} onChange={(e) => setJobDetails({ ...jobDetails, jobDescription: e.target.value })} value={jobDetails.jobDescription} />
          
          <Texts fontSize='sm' color='var(--text-light)'>Contact Via<Required /></Texts>
          <Select
            options={[
              { id: 'joburl', name: 'Job Page URL' },
              { id: 'email', name: 'Email' },
            ]}
            onChange={(value) => setJobExternal(value)}
            value={jobExternal}
            
          />

          <Texts fontSize='sm' color='var(--text-light)'>{jobExternal === 'email' ? 'Email' : 'Job Page URL'}<Required /></Texts>
          <input className={styles.input} onChange={(e) => setJobDetails({ ...jobDetails, jobUrl: e.target.value })} placeholder={
            jobExternal === 'email' ? 'e.g contact@sunwayblockchain.com' : 'e.g https://sunwayblockchain.com/careers/job/software-engineer'
          } value={jobDetails.jobUrl} />
          

          <Texts fontSize='sm' color='var(--text-light)'>Payment Currency</Texts>
          <Select
            options={[
              { id: '', name: 'Select a Currency' },
              { id: 'USD', name: 'USD' },
              { id: 'EUR', name: 'EUR' },
              { id: 'MYR', name: 'MYR' },
              { id: 'SGD', name: 'SGD' },
              { id: 'INR', name: 'INR' },
              { id: 'RMB', name: 'RMB' },
            ]}
            onChange={(value) => setJobDetails({ ...jobDetails, payCurrency: value })}
            value={jobDetails.payCurrency}
          />
          <Texts fontSize='sm' color='var(--text-light)'>Minimum Pay</Texts>
          <input className={styles.input} onChange={(e) => setJobDetails({ ...jobDetails, minPay: parseInt(e.target.value) })} placeholder='e.g 1000' value={jobDetails.minPay} />
          <Texts fontSize='sm' color='var(--text-light)'>Maximum Pay</Texts>
          <input className={styles.input} onChange={(e) => setJobDetails({ ...jobDetails, maxPay: parseInt(e.target.value) })} placeholder='e.g 2000' value={jobDetails.maxPay} />
          <Texts fontSize='sm' color='var(--text-light)'>Payment Schedule</Texts>
          <Select
            options={[
              { id: '', name: 'Select a Schedule' },
              { id: 'Monthly', name: 'Monthly' },
              { id: 'Yearly', name: 'Yearly' },
              { id: 'Hourly', name: 'Hourly' },
              { id: 'One-Time', name: 'One-Time' },
              { id: 'Project-Based', name: 'Project-Based' },
            ]}
            onChange={(value) => setJobDetails({ ...jobDetails, paymentSchedule: value })}
            value={jobDetails.paymentSchedule}
          />
          <Texts fontSize='sm' color='var(--text-light)'>Location<Required /></Texts>
          <input className={styles.input} onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })} placeholder='e.g Sunway University, Malaysia' value={jobDetails.location} />
          <Texts fontSize='sm' color='var(--text-light)'>Timezone</Texts>
          {/* List all GMT timezones */}
          <Select
            options={[
              { id: '', name: 'Select a Timezone' },
              { id: 'GMT-12', name: 'GMT-12' },
              { id: 'GMT-11', name: 'GMT-11' },
              { id: 'GMT-10', name: 'GMT-10' },
              { id: 'GMT-9', name: 'GMT-9' },
              { id: 'GMT-8', name: 'GMT-8' },
              { id: 'GMT-7', name: 'GMT-7' },
              { id: 'GMT-6', name: 'GMT-6' },
              { id: 'GMT-5', name: 'GMT-5' },
              { id: 'GMT-4', name: 'GMT-4' },
              { id: 'GMT-3', name: 'GMT-3' },
              { id: 'GMT-2', name: 'GMT-2' },
              { id: 'GMT-1', name: 'GMT-1' },
              { id: 'GMT+0', name: 'GMT+0' },
              { id: 'GMT+1', name: 'GMT+1' },
              { id: 'GMT+2', name: 'GMT+2' },
              { id: 'GMT+3', name: 'GMT+3' },
              { id: 'GMT+4', name: 'GMT+4' },
              { id: 'GMT+5', name: 'GMT+5' },
              { id: 'GMT+6', name: 'GMT+6' },
              { id: 'GMT+7', name: 'GMT+7' },
              { id: 'GMT+8', name: 'GMT+8' },
              { id: 'GMT+9', name: 'GMT+9' },
              { id: 'GMT+10', name: 'GMT+10' },
              { id: 'GMT+11', name: 'GMT+11' },
              { id: 'GMT+12', name: 'GMT+12' },
            ]}
            onChange={(value) => setJobDetails({ ...jobDetails, timezone: value })}
            value={jobDetails.timezone}
          />
          <Texts fontSize='sm' color='var(--text-light)'>Remote / OnSite / Hybrid<Required /></Texts>
          <Select
            options={[
              { id: '', name: 'Select an Option' },
              { id: 'remote', name: 'Remote' },
              { id: 'onsite', name: 'Onsite' },
              { id: 'hybrid', name: 'Hybrid' },
            ]}
            onChange={(value) => setJobDetails({ ...jobDetails, isRemote: value })}
            value={jobDetails.isRemote}
          />
          <Texts fontSize='sm' color='var(--text-light)'>Job Type<Required /></Texts>
          <Select
            options={[
              { id: '', name: 'Select a Type' },
              { id: 'Full-Time', name: 'Full-Time' },
              { id: 'Part-Time', name: 'Part-Time' },
              { id: 'Contract', name: 'Contract' },
              { id: 'Internship', name: 'Internship' },
              { id: 'Freelance', name: 'Freelance' },
            ]}
            onChange={(value) => setJobDetails({ ...jobDetails, jobType: value })}
            value={jobDetails.jobType}
          />
          <Texts fontSize='sm' color='var(--text-light)'>Skill<Required /></Texts>
          <Select
            options={[
              { id: '', name: 'Select a Skill' },
              { id: "ton-developer", name: "TON Developer" },
              { id: "software-engineer", name: "Software Engineer" },
              { id: "software-engineer-mobile", name: "Software Engineer (Mobile)" },
              { id: "front-end", name: "FrontEnd Developer" },
              { id: "back-end", name: "BackEnd Developer" },
              { id: "blockchain", name: "Blockchain Developer" },
              { id: "business-developer", name: "Business Developer" },
              { id: "cloud", name: "Cloud Engineer" },
              { id: "c-plus-plus", name: "C / C++" },
              { id: "dot-net", name: "C# / .NET" },
              { id: "golang", name: "Golang" },
              { id: "java", name: "Java" },
              { id: "node", name: "Node.js" },
              { id: "php", name: "PHP" },
              { id: "python", name: "Python" },
              { id: "ruby", name: "Ruby" },
              { id: "rust", name: "Rust" },
              { id: "scala", name: "Scala" },
              { id: "ai", name: "AI Engineer" },
              { id: "prompt", name: "Prompt Engineer" },
              { id: "full-stack", name: "Full Stack (Javascript)" },
              { id: "game-dev", name: "Unity" },
              { id: "android", name: "Android" },
              { id: "flutter", name: "Flutter" },
              { id: "react-native", name: "React Native" },
              { id: "ios", name: "iOS" },
              { id: "analyst", name: "Analyst" },
              { id: "cto", name: "CTO" },
              { id: "customer-support", name: "Customer Support" },
              { id: "data-science", name: "Data Science" },
              { id: "design", name: "Design" },
              { id: "devops", name: "Devops" },
              { id: "product-manager", name: "Product Manager" },
              { id: "project-manager", name: "Project Manager" },
              { id: "quality-assurance", name: "Quality Assurance" },
              { id: "security", name: "Security" },
              { id: "ux-researcher", name: "UX Researcher" },
              { id: "community-manager", name: "Community Manager" },
              { id: "copywriting", name: "Copywriting" },
              { id: "economy-designer", name: "Economy Designer" },
              { id: "hr", name: "HR" },
              { id: "kyc", name: "KYC" },
              { id: "legal", name: "Legal" },
              { id: "marketing", name: "Marketing" },
              { id: "recruiter", name: "Recruiter" },
              { id: "seo", name: "SEO" },
              { id: "sales", name: "Sales" },
              { id: "social-media", name: "Social Media" },
              { id: "others", name: "Others" },
              ]}
            onChange={(value) => setJobDetails({ ...jobDetails, skill: value })}
            value={jobDetails.skill}
          />
          <button className={styles.addButton} onClick={Submit}>Create Job Listing</button>
        </>
      )}
    </section>
  )

}

export default JobsAdmin;
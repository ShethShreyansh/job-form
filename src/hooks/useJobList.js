import { useEffect, useState } from "react"

export default function useJobList() {
    const [jobListData,setJobListData] = useState([])
    
    function fetchJobListData() {
        const jobList = localStorage.getItem('jobList')
        if(jobList) setJobListData(JSON.parse(jobList))
    }
    
    useEffect(()=> fetchJobListData() ,[])
    
    return {jobListData, fetchJobListData}
}
import { Button, Card } from "flowbite-react"
import useJobList from "../../../hooks/useJobList"
import { useNavigate } from "react-router-dom"
import styles from './JobList.css'

export default function JobList() {
    const {jobListData} = useJobList()
    const navigate = useNavigate()
    
    return <Card className="m-4">
        <div className="flex">
            <div className="flex-auto w-80 text-4xl text-center">
                Job List
            </div>
            <Button className="flex-end" onClick={()=>navigate('/create-job')}>
                Add New Job
            </Button>
        </div>
        <hr/>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                jobListData.sort((a,b) => b?.id - a?.id).map((item) => {
                    return  <div key={item.id}>
                        <Card className={styles.cardContainer} onClick={() => navigate(`/create-job/${item.id}`)}>
                                <div className="flex">
                                    <h1 className="text-2xl"> {item?.jobtitle } </h1>
                                    <div className="text-2xl"> - </div>
                                    <h1  className="text-2xl"> {item?.jobType } </h1>
                                </div>
                                <div>Experience : {item?.jobExperience}, Salary : {item?.salary}</div>
                                <div>Job Expires in next <b>{item?.jobExpiresIndays}</b> days</div>
                                <div>Location : {item?.location}</div>
                        </Card>
                    </div>
                })
            }
        </div>
    </Card>
}
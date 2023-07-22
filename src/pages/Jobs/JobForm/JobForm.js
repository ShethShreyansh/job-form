import { Button, Card, Label, TextInput, Textarea } from "flowbite-react"
import { DateTime } from "luxon";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function JobForm() {
    const navigate = useNavigate();
    const urlData = useParams()
    const [formValues, setFormValues]= useState({
        jobtitle:'',
        jobFunction:'',
        jobType:'',
        jobExperience:'',
        salary:'',
        jobExpiresIndays:'',
        jobExpiresFroDate:'',
        jobSkils:'',
        companyLogo:'',
        location:'',
    })

    useEffect(()=>{
        if(urlData?.id) {
            let jobList = localStorage.getItem('jobList')
            if(jobList) {
                jobList = JSON.parse(jobList)
                let job = jobList.find((item)=> item.id == urlData?.id)
                if(job) setFormValues(job)
            }
        }
    },[urlData])

    const onChange = (e) => {
        setFormValues((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
		});
	};
   
    const createNewJob= (values) =>{
        return {id:Date.now(), ...values, createted_at: new Date().toLocaleString()}
    }

    const calculateDate =(e)=>{
        if(e.target.value && parseInt(e.target.value)){
            let dateCalculate = DateTime.now().plus({days:parseInt(e.target.value)}).toFormat('dd-MM-yyyy')
            setFormValues({...formValues, jobExpiresFroDate : dateCalculate})
        } else {
            setFormValues({...formValues, jobExpiresFroDate : 'Enter Number not String'})
        }
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        let jobList = localStorage.getItem('jobList')
        if(jobList){
            jobList = JSON.parse(jobList)
            if(urlData?.id){
                let filtertedJobList = jobList.filter((item)=> item.id != urlData?.id)
                filtertedJobList.push({id:urlData?.id, ...formValues})
                localStorage.setItem('jobList', JSON.stringify(filtertedJobList))
            } else {
                jobList.push(createNewJob(formValues))
                localStorage.setItem('jobList', JSON.stringify(jobList))
            }
        } else {
            localStorage.setItem('jobList', JSON.stringify([createNewJob(formValues)]))
        }
        navigate("/");
    }


    return <Card className="m-4">
        <div className="flex">
            <div className="flex-auto w-90 text-4xl text-center">
            {!urlData?.id ? 'Create Job' : `Update Job for - ${formValues.jobtitle}`}
            </div>
            <Button className="flex-end" onClick={()=>navigate('/')}>
                Back
            </Button>
        </div>
        <hr/>
        <form className="flex w-90 ml-auto mr-auto flex-col gap-4" onSubmit={onSubmit}>
            <div className={"flex gap-4"}>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="jobTitle"
                        value="Job Title"
                    />
                    </div>
                    <TextInput
                        name="jobtitle"
                        onChange={onChange}
                        id="JobTitle"
                        required
                        type="Text"
                        value={formValues.jobtitle}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="jobType"
                        value="Job Type"
                    />
                    </div>
                    <TextInput
                        name="jobType"
                        onChange={onChange}
                        id="jobType"
                        required
                        type="text"
                        value={formValues.jobType}
                    />
                </div>
            </div>

            <div className={"flex gap-4"}>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="jobExperience"
                        value="Job Experience"
                    />
                    </div>
                    <TextInput
                    name="jobExperience"
                    value={formValues.jobExperience}
                    onChange={onChange}
                    id="jobExperience"
                    required
                    type="Text"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="salary"
                        value="Salary"
                    />
                    </div>
                    <TextInput
                        name="salary"
                        value={formValues.salary}
                        onChange={onChange}
                        id="salary"
                        required
                        type="text"
                    />
                </div>
            </div>

            <div className={"flex gap-4"}>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="jobExpiresIndays"
                        value="Job Expires in days"
                    />
                    </div>
                    <TextInput
                        name="jobExpiresIndays"
                        value={formValues.jobExpiresIndays}
                        onChange={onChange}
                        onBlur={calculateDate}
                        id="jobExpiresIndays"
                        required
                        type="Text"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="jobExpiresFroDate"
                        value="Job Expires From Date"
                    />
                    </div>
                    <TextInput
                        name="jobExpiresFroDate"
                        value={formValues.jobExpiresFroDate}
                        disabled
                        id="jobExpiresFroDate"
                        required
                        type="text"
                    />
                </div>
            </div>

            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="jobSkils"
                        value="Skils"
                    />
                </div>
                <TextInput
                    name="jobSkils"
                    value={formValues.jobSkils}
                    onChange={onChange}
                    id="jobSkils"
                    required
                    type="Text"
                />
            </div>
            
            <div className={"flex gap-4"}>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="jobLocation"
                        value="Location"
                    />
                    </div>
                    <TextInput
                    name="location"
                    value={formValues.location}
                    onChange={onChange}
                    id="jobLocation"
                    required
                    type="Text"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="companyLogo"
                            value="CompanyLogo"
                        />
                    </div>
                    <TextInput
                        name="companyLogo"
                        value={formValues.companyLogo}
                        onChange={onChange}
                        id="companyLogo"
                        required
                        type="Text"
                    />
                </div>
            </div>

            <div className="max-w-md" id="textarea">
                <div className="mb-2 block">
                    <Label
                        htmlFor="JobFunction"
                        value="Job function"
                    />
                </div>
                <Textarea
                    id="JobFunction"
                    name="jobFunction"
                    value={formValues.jobFunction}
                    onChange={onChange}
                    placeholder="Leave a comment..."
                    required
                    rows={4}
                />
            </div>

            <Button type="submit">
                {!urlData?.id ? 'Create Job' : 'Update Job'}
            </Button>
        </form>
    </Card>
}
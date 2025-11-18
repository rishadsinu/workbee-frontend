import { api } from "./axios-instance";

export const WorkService = {
    getAppliers:() => {
        return api.get("/work/get-new-appliers");
    } ,

    approveWorkerApplication:(data:{email:string}) => {
        return api.post("/work/approve-worker",data)
    }, 

    getAllWorkers:() => {
        return api.get("/work/get-workers")
    },

    getAllWorks:()=>{
        return api.get("/work/get-all-works")
    },

    postWork: (formData:FormData) => {
        return api.post("/work/post-work",formData, {
            headers:{"Content-Type":"multipart/form-data"}
        })
    },

    applyForWorker:(workerData:any) => {
        return api.post("work/apply-worker",workerData)
    }
}


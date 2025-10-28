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
    }
}


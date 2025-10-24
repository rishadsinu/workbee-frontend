import { api } from "./axios-instance";

export const WorkService = {
    getAppliers:() => {
        return api.get("/work/get-new-appliers");
    } ,

    workerLogin:(data:{email:string, password:string}) => {
        return api.post("/work/worker-login",data)
    },

    approveWorkerApplication:(data:{email:string}) => {
        return api.post("/work/approve-worker",data)
    }, 

    getAllWorkers:() => {
        return api.get("/work/get-workers")
    }
}


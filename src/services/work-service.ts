import { api } from "./axios-instance";

export const WorkService = {
    getAppliers: () => {
        return api.get("/work/get-new-appliers");
    },

   
    approveWorkerApplication: (data: { workerId: string|undefined, status: "approved" | "rejected" }) => {
        return api.post("/work/approve-worker", data)
    },


    getAllWorkers: () => {
        return api.get("/work/get-workers")
    },

    getAllWorks: (filters?: {
        search?: string;
        status?: string;
        page?: number;
        limit?: number;
        latitude?: number;    
        longitude?: number;   
        maxDistance?: number; 
    }) => {
        const params = new URLSearchParams();
        
        if (filters?.search) params.append('search', filters.search);
        if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        
        if (filters?.latitude !== undefined) params.append('latitude', filters.latitude.toString());
        if (filters?.longitude !== undefined) params.append('longitude', filters.longitude.toString());
        if (filters?.maxDistance !== undefined) params.append('maxDistance', filters.maxDistance.toString());
        
        return api.get(`/work/get-all-works?${params.toString()}`);
    },

    postWork: (formData: FormData) => {
        return api.post("/work/post-work", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
    },

    applyForWorker: (workerData: any) => {
        return api.post("/work/apply-worker", workerData)
    },

    blockWorker: (id: string) => {
        return api.patch(`/work/block-worker/${id}`);
    },
}


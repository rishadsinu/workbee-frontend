import { WorkService } from "@/services/work-service";
import { useEffect, useState } from "react";

interface Work {
    id: string;
    userId: string;
    workTitle: string;
    workCategory: string;
    workType: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    time?: string;
    description?: string;
    location?: {
        type: string;
        coordinates: [number, number];
    };
    manualAddress?: string;
    landmark?: string;
    budget?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default function MyWorks() {
    const [works, setWorksData] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAllWorks = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const res = await WorkService.getMyWorks();
            
            console.log('API Response:', res.data);
            
            if (res.data.success) {
                setWorksData(res.data.data.works || []);
            } else {
                setError('Error while fetching works data');
            }
        } catch (error: any) {
            console.error('Error fetching works:', error);
            setError(error.response?.data?.message || error.message || 'Error fetching works data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllWorks();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading your works...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={getAllWorks}>Try Again</button>
            </div>
        );
    }

    if (!works || works.length === 0) {
        return (
            <div style={{ padding: '20px' }}>
                <h1>My Works</h1>
                <p>No works found. Start by posting your first work!</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>My Works</h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                Total Works: {works.length}
            </p>
            
            {works.map((work) => (
                <div 
                    key={work.id} 
                    style={{ 
                        border: '1px solid #ddd', 
                        borderRadius: '8px',
                        padding: '20px', 
                        margin: '15px 0',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <h2 style={{ marginTop: 0, color: '#333' }}>
                        {work.workTitle}
                    </h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <p><strong>Category:</strong> {work.workCategory}</p>
                        <p><strong>Type:</strong> {work.workType}</p>
                        
                        {work.date && (
                            <p><strong>Date:</strong> {new Date(work.date).toLocaleDateString()}</p>
                        )}
                        
                        {work.startDate && (
                            <p><strong>Start Date:</strong> {new Date(work.startDate).toLocaleDateString()}</p>
                        )}
                        
                        {work.endDate && (
                            <p><strong>End Date:</strong> {new Date(work.endDate).toLocaleDateString()}</p>
                        )}
                        
                        {work.budget && (
                            <p><strong>Budget:</strong> ${work.budget}</p>
                        )}
                        
                        {work.status && (
                            <p>
                                <strong>Status:</strong> 
                                <span style={{ 
                                    marginLeft: '5px',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: work.status === 'completed' ? '#d4edda' : '#fff3cd'
                                }}>
                                    {work.status}
                                </span>
                            </p>
                        )}
                    </div>
                    
                    {work.description && (
                        <div style={{ marginTop: '15px' }}>
                            <strong>Description:</strong>
                            <p style={{ marginTop: '5px', color: '#555' }}>{work.description}</p>
                        </div>
                    )}
                    
                    {work.manualAddress && (
                        <p><strong>Address:</strong> {work.manualAddress}</p>
                    )}
                    
                    {work.landmark && (
                        <p><strong>Landmark:</strong> {work.landmark}</p>
                    )}
                    
                    <div style={{ marginTop: '15px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                        <button 
                            style={{ 
                                padding: '8px 16px', 
                                marginRight: '10px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            onClick={() => console.log('Edit work:', work.id)}
                        >
                            Edit
                        </button>
                        <button 
                            style={{ 
                                padding: '8px 16px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete this work?')) {
                                    console.log('Delete work:', work.id);
                                }
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

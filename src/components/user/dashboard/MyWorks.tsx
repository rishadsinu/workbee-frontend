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

interface EditModalProps {
    work: Work;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (updatedWork: Work) => void;
}

function EditModal({ work, isOpen, onClose, onUpdate }: EditModalProps) {
    const [formData, setFormData] = useState<Work>(work);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setFormData(work);
    }, [work]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'budget' ? (value ? Number(value) : undefined) : value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.workTitle || !formData.workCategory || !formData.workType) {
            alert("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await WorkService.updateWork(formData.id, formData);

            if (response.data.success) {
                onUpdate(formData);
                onClose();
                alert("Work updated successfully!");
            } else {
                alert(response.data.message || "Failed to update work");
            }
        } catch (error: any) {
            console.error("Error updating work:", error);
            alert(error.response?.data?.message || "Failed to update work. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Modal Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #ddd',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1
                }}>
                    <h2 style={{ margin: 0 }}>Edit Work</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                            padding: '0',
                            width: '30px',
                            height: '30px'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Modal Body */}
                <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Work Title *
                        </label>
                        <input
                            type="text"
                            name="workTitle"
                            value={formData.workTitle}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Category *
                            </label>
                            <input
                                type="text"
                                name="workCategory"
                                value={formData.workCategory}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Type *
                            </label>
                            <input
                                type="text"
                                name="workType"
                                value={formData.workType}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate || ''}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate || ''}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Budget ($)
                            </label>
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget || ''}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status || 'active'}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                resize: 'vertical',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Address
                        </label>
                        <input
                            type="text"
                            name="manualAddress"
                            value={formData.manualAddress || ''}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Landmark
                        </label>
                        <input
                            type="text"
                            name="landmark"
                            value={formData.landmark || ''}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Modal Footer */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '10px',
                        paddingTop: '15px',
                        borderTop: '1px solid #ddd'
                    }}>
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                backgroundColor: 'white',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: isSubmitting ? '#ccc' : '#007bff',
                                color: 'white',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Work'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MyWorks() {
    const [works, setWorksData] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingWork, setEditingWork] = useState<Work | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAllWorks = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await WorkService.getMyWorks();

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

    const handleEdit = (work: Work) => {
        setEditingWork(work);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingWork(null);
    };

    const handleUpdate = (updatedWork: Work) => {
        // Update the work in the local state
        setWorksData(prevWorks =>
            prevWorks.map(work =>
                work.id === updatedWork.id ? updatedWork : work
            )
        );
    };

    const handleDelete = async (workId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this work?");
        if (!confirmDelete) return;
        try {
            const res = await WorkService.deleteMyWork(workId);

            if (res.data.success) {
                alert("Deleted successfully");

                // Remove the deleted work from UI
                setWorksData(prev => prev.filter(work => work.id !== workId));
            } else {
                alert("Error while deleting work");
            }
        } catch (error: any) {
            console.error("Delete error:", error);
            alert(error.response?.data?.message || "Error while deleting work");
        }
    };


    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading your works...</p>
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
                            onClick={() => handleEdit(work)}
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
                            onClick={() => handleDelete(work.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {editingWork && (
                <EditModal
                    work={editingWork}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}
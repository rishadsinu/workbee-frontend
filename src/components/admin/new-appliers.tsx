import { useState, useEffect } from "react"
import { Eye, X, Search, BookmarkIcon } from "lucide-react"
import { WorkService } from "@/services/work-service"
import { Toggle } from "../ui/toggle"

// Types
interface Applier {
  _id?: string
  id?: string
  name: string
  email: string
  phone: string
  location: string
  workType: string
  preferredWorks: string[]
  confirmations: {
    reliable: boolean
    honest: boolean
    termsAccepted: boolean
  }
  status: string;
  createdAt?: Date
}

// UI Components
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  disabled = false,
  className = "",
  type = "button",
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "icon"
  disabled?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
  }
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    icon: "h-10 w-10",
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}

const Input = ({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  )
}

const Badge = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode
  variant?: "default" | "success" | "secondary"
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    secondary: "bg-blue-100 text-blue-700",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  )
}

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  applier,
  onRefresh,
}: {
  isOpen: boolean
  onClose: () => void
  applier: Applier | null
  onRefresh: () => void
}) => {
  if (!isOpen || !applier) return null

  const approveWorker = async () => {
    try {
      const res = await WorkService.approveWorkerApplication({
        workerId: applier.id || applier._id,
        status: "approved"
      })
      if (res.data.success) {
        alert('Successfully approved worker')
        onClose()
        onRefresh()
      }
    } catch (error) {
      console.error('Error approving worker:', error)
      alert('Error approving worker')
    }
  }

  const rejectWorker = async () => {
    try {
      const res = await WorkService.approveWorkerApplication({
        workerId: applier.id || applier._id,
        status: "rejected"
      })
      if (res.data.success) {
        alert('Worker application rejected')
        onClose()
        onRefresh()
      }
    } catch (error) {
      console.error('Error rejecting worker:', error)
      alert('Error rejecting worker')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{applier.name}</h2>
            <p className="text-sm text-gray-500 mt-1">New worker application</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{applier.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{applier.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <p className="mt-1 text-sm text-gray-900">{applier.phone}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Location</label>
              <p className="mt-1 text-sm text-gray-900">{applier.location}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Work Type</label>
              <p className="mt-1">
                <Badge variant="secondary">{applier.workType}</Badge>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Applied On</label>
              <p className="mt-1 text-sm text-gray-900">
                {applier.createdAt
                  ? new Date(applier.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <label className="text-sm font-medium text-gray-700">Preferred Works</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {applier.preferredWorks?.length > 0 ? (
                applier.preferredWorks.map((work, index) => (
                  <Badge key={index}>{work}</Badge>
                ))
              ) : (
                <span className="text-sm text-gray-500">No preferred works listed</span>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Confirmations
            </label>
            <div className="space-y-2">
              {Object.entries(applier.confirmations).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center ${value ? "bg-black" : "bg-gray-300"
                      }`}
                  >
                    {value && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700 capitalize">{key}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t px-6 py-4 flex items-center justify-between">
          {/* Left side text */}
          <div>
            <h6 className="text-sm font-medium text-gray-800">
              Accept and give permission
            </h6>
            <p className="text-xs text-gray-500">
              Enable this to approve the worker application
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={approveWorker}>
              Approve
            </Button>

            <Button variant="outline" onClick={rejectWorker}>
              Reject
            </Button>
          </div>
        </div>




      </div>
    </div>
  )
}

// Main Component
export default function NewAppliers() {
  const [newAppliers, setNewAppliers] = useState<Applier[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplier, setSelectedApplier] = useState<Applier | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const getNewAppliers = async () => {
    try {
      setLoading(true)
      const response = await WorkService.getAppliers()
      if (response.data.success) {
        const appliers = response.data.data
        setNewAppliers(Array.isArray(appliers) ? appliers : [])
      }
    } catch (error) {
      console.error("Error fetching new appliers:", error)
      alert("Error while fetching new appliers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNewAppliers()
  }, [])

  // Search and pagination
  const filteredAppliers = newAppliers.filter((a) =>
    [a.name, a.email, a.phone, a.location]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredAppliers.slice(indexOfFirstItem, indexOfLastItem)

  const handleViewDetails = (applier: Applier) => {
    setSelectedApplier(applier)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appliers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex items-center justify-between flex-wrap gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Approve
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((applier) => (
                    <tr key={applier.id || applier._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {applier.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{applier.email}</td>
                      <td className="px-6 py-4 text-gray-600">{applier.phone}</td>
                      <td className="px-6 py-4 text-center">
                        <Toggle
                          aria-label="Toggle bookmark"
                          size="sm"
                          variant="outline"
                          className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
                        >
                          <BookmarkIcon />
                          {applier.status === "approved"
                            ? "Approved"
                            : applier.status === "rejected"
                              ? "Rejected"
                              : "Pending"}
                        </Toggle>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(applier)}
                          className="inline-flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No appliers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applier={selectedApplier}
        onRefresh={getNewAppliers}
      />
    </div>
  )
}
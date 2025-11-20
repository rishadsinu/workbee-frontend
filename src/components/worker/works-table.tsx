import { useState, useEffect } from "react"
import { Eye, X, Search, MapPin, Calendar, Clock, DollarSign, Filter } from "lucide-react"
import { WorkService } from "@/services/work-service"
import axios from "axios"

// Types
interface Work {
  id?: string
  userId: string
  workTitle: string
  workCategory: string
  workType: 'oneDay' | 'multipleDay'
  date?: string
  startDate?: string
  endDate?: string
  time: string
  description: string
  voiceFile?: string
  videoFile?: string
  duration?: string
  budget?: string
  currentLocation?: string
  manualAddress?: string
  landmark?: string
  place?: string
  contactNumber: string
  beforeImage?: string
  petrolAllowance?: string
  extraRequirements?: string
  anythingElse?: string
  termsAccepted: boolean
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled'
  createdAt?: Date
  updatedAt?: Date
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
  variant?: "default" | "success" | "warning" | "danger" | "info"
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  )
}

const Select = ({
  value,
  onChange,
  children,
  className = "",
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  children: React.ReactNode
  className?: string
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
    >
      {children}
    </select>
  )
}

// Helper function to get status badge variant
const getStatusVariant = (status: string): "default" | "success" | "warning" | "danger" | "info" => {
  switch (status) {
    case 'pending': return 'warning'
    case 'assigned': return 'info'
    case 'in-progress': return 'default'
    case 'completed': return 'success'
    case 'cancelled': return 'danger'
    default: return 'default'
  }
}

// // const 
// const getWorkersCount = () => {
//   try {
//     let count = axios.get("http://localhost:4000/auth/get-workerscount")
//   } catch (error) {
//     alert(error)
//   }
// }
// useEffect(()=>{
//   get
// })

// Helper function to format date
const formatDate = (dateString?: string | Date) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Modal Component
const WorkDetailsModal = ({
  isOpen,
  onClose,
  work,
}: {
  isOpen: boolean
  onClose: () => void
  work: Work | null
}) => {
  if (!isOpen || !work) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{work.workTitle}</h2>
            <p className="text-sm text-gray-500 mt-1">{work.workCategory}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>
          <h1>count of approved workes</h1>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Work Type</label>
              <p className="mt-1">
                <Badge variant="info">
                  {work.workType === 'oneDay' ? 'One Day Work' : 'Multiple Day Work'}
                </Badge>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1">
                <Badge variant={getStatusVariant(work.status)}>
                  {work.status.toUpperCase()}
                </Badge>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {work.workType === 'oneDay' ? 'Date' : 'Start Date'}
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {work.workType === 'oneDay' ? formatDate(work.date) : formatDate(work.startDate)}
              </p>
            </div>
            {work.workType === 'multipleDay' && (
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  End Date
                </label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(work.endDate)}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Time
              </label>
              <p className="mt-1 text-sm text-gray-900">{work.time}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Duration</label>
              <p className="mt-1 text-sm text-gray-900">{work.duration || 'Not specified'}</p>
            </div>
          </div>

          {/* Description */}
          <div className="border-t pt-4">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <p className="mt-2 text-sm text-gray-900 whitespace-pre-wrap">{work.description}</p>
          </div>

          {/* Budget & Payment */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              Budget & Payment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Budget</label>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  ₹{work.budget || 'Not specified'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Travel Allowance</label>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {work.petrolAllowance ? `₹${work.petrolAllowance}` : 'Not specified'}
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Location Details
            </h3>
            <div className="space-y-3">
              {work.manualAddress && (
                <div>
                  <label className="text-sm text-gray-600">Address</label>
                  <p className="mt-1 text-sm text-gray-900">{work.manualAddress}</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {work.landmark && (
                  <div>
                    <label className="text-sm text-gray-600">Landmark</label>
                    <p className="mt-1 text-sm text-gray-900">{work.landmark}</p>
                  </div>
                )}
                {work.place && (
                  <div>
                    <label className="text-sm text-gray-600">Place</label>
                    <p className="mt-1 text-sm text-gray-900">{work.place}</p>
                  </div>
                )}
              </div>
              {work.currentLocation && (
                <div>
                  <label className="text-sm text-gray-600">Map Location</label>
                  <p className="mt-1 text-sm text-blue-600 hover:underline">
                    <a href={work.currentLocation} target="_blank" rel="noopener noreferrer">
                      View on Map
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="border-t pt-4">
            <label className="text-sm font-medium text-gray-700">Contact Number</label>
            <p className="mt-1 text-sm text-gray-900">{work.contactNumber}</p>
          </div>

          {/* Additional Requirements */}
          {(work.extraRequirements || work.anythingElse) && (
            <div className="border-t pt-4 space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Additional Information</h3>
              {work.extraRequirements && (
                <div>
                  <label className="text-sm text-gray-600">Extra Requirements</label>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                    {work.extraRequirements}
                  </p>
                </div>
              )}
              {work.anythingElse && (
                <div>
                  <label className="text-sm text-gray-600">Additional Notes</label>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                    {work.anythingElse}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Media Files */}
          {(work.beforeImage || work.voiceFile || work.videoFile) && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Attachments</h3>
              <div className="flex flex-wrap gap-2">
                {work.beforeImage && (
                  <a
                    href={`http://localhost:4002/${work.beforeImage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    📷 View Image
                  </a>
                )}
                {work.voiceFile && (
                  <a
                    href={`http://localhost:4002/${work.voiceFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    🎤 Listen Voice Note
                  </a>
                )}
                {work.videoFile && (
                  <a
                    href={`http://localhost:4002/${work.videoFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    🎥 Watch Video
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
              <div>
                <span className="font-medium">Posted:</span> {formatDate(work.createdAt)}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span> {formatDate(work.updatedAt)}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>

          <Button variant="outline">
            Chat with Client Now!
          </Button>
        </div>

      </div>
    </div>
  )
}

// Main Component
export default function WorkerWorksTable() {
  const [works, setWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const fetchWorks = async () => {
    try {
      setLoading(true)
      const response = await WorkService.getAllWorks()

      if (response.data.success) {
        const worksData = response.data.data
        setWorks(Array.isArray(worksData) ? worksData : [])
      }
    } catch (error) {
      console.error("Error fetching works:", error)
      alert("Error while fetching works")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorks()
  }, [statusFilter])

  // Search and pagination
  const filteredWorks = works.filter((work) =>
    [work.workTitle, work.workCategory, work.description, work.manualAddress]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredWorks.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage)

  const handleViewDetails = (work: Work) => {
    setSelectedWork(work)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading available works...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Available Works</h1>
          <p className="text-sm text-gray-600 mt-1">Browse and apply for works near you</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex items-center justify-between flex-wrap gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by title, category, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-40"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Work Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((work) => (
                    <tr key={work.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{work.workTitle}</div>
                        <div className="text-sm text-gray-500">{formatDate(work.date || work.startDate)}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{work.workCategory}</td>
                      <td className="px-6 py-4">
                        <Badge variant="info">
                          {work.workType === 'oneDay' ? 'One Day' : 'Multiple Days'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {work.budget ? `₹${work.budget}` : 'Not specified'}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={getStatusVariant(work.status)}>
                          {work.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(work)}
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
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No works found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredWorks.length)} of{' '}
                {filteredWorks.length} results
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded text-sm ${currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <WorkDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        work={selectedWork}
      />
    </div>
  )
}
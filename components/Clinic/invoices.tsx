"use client"

import { useState } from "react"
import { FileText, DollarSign, Check, Clock, Trash2, Plus, X, Eye, Download } from "lucide-react"

// --- Types ---
type InvoiceType = {
  id: number;
  invoiceNumber: string;
  patientName: string;
  amount: string;
  date: string;
  dueDate: string;
  status: string;
  paymentMethod: string;
  doctorName: string;
  hospitalName: string;
  description: string;
};

interface InvoiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceType | null;
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  invoiceNumber?: string;
}

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (formData: InvoiceType) => void;
}

const invoicesData = [
  {
    id: 1,
    invoiceNumber: "INV-001",
    patientName: "John Anderson",
    amount: "150.00",
    date: "2025-11-05",
    dueDate: "2025-11-12",
    status: "Paid",
    paymentMethod: "Card",
    doctorName: "Dr. Sarah Johnson",
    hospitalName: "City Medical Center",
    description: "Regular checkup consultation",
  },
  {
    id: 2,
    invoiceNumber: "INV-002",
    patientName: "Emily Roberts",
    amount: "200.00",
    date: "2025-11-04",
    dueDate: "2025-11-11",
    status: "Pending",
    paymentMethod: "Cash",
    doctorName: "Dr. Michael Chen",
    hospitalName: "Green Valley Hospital",
    description: "Follow-up consultation",
  },
  {
    id: 3,
    invoiceNumber: "INV-003",
    patientName: "Michael Smith",
    amount: "100.00",
    date: "2025-11-03",
    dueDate: "2025-11-10",
    status: "Overdue",
    paymentMethod: "Cash",
    doctorName: "Dr. Emily Rodriguez",
    hospitalName: "Sunset Health Clinic",
    description: "Initial consultation",
  },
  {
    id: 4,
    invoiceNumber: "INV-004",
    patientName: "Sarah Williams",
    amount: "175.00",
    date: "2025-11-02",
    dueDate: "2025-11-09",
    status: "Paid",
    paymentMethod: "Card",
    doctorName: "Dr. James Wilson",
    hospitalName: "Downtown Care Hospital",
    description: "Physical therapy session",
  },
  {
    id: 5,
    invoiceNumber: "INV-005",
    patientName: "David Brown",
    amount: "120.00",
    date: "2025-11-01",
    dueDate: "2025-11-08",
    status: "Pending",
    paymentMethod: "Card",
    doctorName: "Dr. Lisa Anderson",
    hospitalName: "North Star Medical",
    description: "Skin treatment",
  },
]

function InvoiceDetailModal({ isOpen, onClose, invoice }: InvoiceDetailModalProps) {
  if (!isOpen || !invoice) return null

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Invoice Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Invoice Header */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Invoice Number</p>
                <p className="text-2xl font-bold text-gray-900">{invoice.invoiceNumber}</p>
              </div>
              <span
                style={{
                  backgroundColor:
                    invoice.status === "Paid" ? "#62e18b" : invoice.status === "Pending" ? "#fcd34d" : "#ef4444",
                }}
                className="px-4 py-2 rounded-full text-sm font-semibold text-black"
              >
                {invoice.status}
              </span>
            </div>
          </div>

          {/* Patient & Doctor Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Patient Information</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{invoice.patientName}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Doctor & Hospital</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-600">Doctor</p>
                  <p className="font-semibold text-gray-900">{invoice.doctorName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Hospital</p>
                  <p className="font-semibold text-gray-900">{invoice.hospitalName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-600">Issue Date</p>
              <p className="font-semibold text-gray-900">{invoice.date}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Due Date</p>
              <p className="font-semibold text-gray-900">{invoice.dueDate}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-2">Description</p>
            <p className="text-gray-900">{invoice.description}</p>
          </div>

          {/* Amount & Payment */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
              <span style={{ color: "#62e18b" }} className="text-3xl font-bold">
                ${invoice.amount}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-600">Payment Method</p>
              <p className="font-semibold text-gray-900 capitalize">{invoice.paymentMethod}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Close
          </button>
          <button
            style={{ backgroundColor: "#62e18b" }}
            className="flex-1 px-4 py-2 text-black rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, invoiceNumber }: DeleteConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Invoice</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete invoice <strong>{invoiceNumber}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Add Invoice Modal ---
function AddInvoiceModal({ isOpen, onClose, onAdd }: AddInvoiceModalProps) {
  const [formData, setFormData] = useState<InvoiceType>({
    id: 0,
    invoiceNumber: "",
    patientName: "",
    amount: "",
    date: "",
    dueDate: "",
    status: "Pending",
    paymentMethod: "",
    doctorName: "",
    hospitalName: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now() });
    onClose();
    setFormData({
      id: 0,
      invoiceNumber: "",
      patientName: "",
      amount: "",
      date: "",
      dueDate: "",
      status: "Pending",
      paymentMethod: "",
      doctorName: "",
      hospitalName: "",
      description: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-xl p-8 mx-4"
        style={{
          width: "620px",
          height: "640px",
          maxWidth: "95vw",
          maxHeight: "95vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Invoice</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          <input
            type="text"
            placeholder="Invoice Number"
            value={formData.invoiceNumber}
            onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={e => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Doctor Name"
            value={formData.doctorName}
            onChange={e => setFormData({ ...formData, doctorName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Hospital Name"
            value={formData.hospitalName}
            onChange={e => setFormData({ ...formData, hospitalName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="date"
            placeholder="Issue Date"
            value={formData.date}
            onChange={e => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="date"
            placeholder="Due Date"
            value={formData.dueDate}
            onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={e => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Payment Method"
            value={formData.paymentMethod}
            onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ backgroundColor: "#62e18b" }}
              className="flex-1 px-4 py-2 text-black rounded-lg font-semibold hover:opacity-90 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function InvoicesManagement() {
  const [invoices, setInvoices] = useState<InvoiceType[]>(invoicesData)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType | null>(null)
  const [deletingInvoiceId, setDeletingInvoiceId] = useState<number | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleViewDetails = (invoice: InvoiceType) => {
    setSelectedInvoice(invoice)
    setIsDetailModalOpen(true)
  }

  const handleDeleteClick = (invoiceId: number) => {
    setDeletingInvoiceId(invoiceId)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    setInvoices(invoices.filter((i) => i.id !== deletingInvoiceId))
    setIsDeleteModalOpen(false)
    setDeletingInvoiceId(null)
  }

  const handleAddInvoice = (formData: InvoiceType) => {
    setInvoices([...invoices, formData]);
  };

  const paidCount = invoices.filter((i) => i.status === "Paid").length
  const pendingCount = invoices.filter((i) => i.status === "Pending").length
  const overdueCount = invoices.filter((i) => i.status === "Overdue").length
  const totalRevenue = invoices.reduce((sum, i) => sum + Number.parseFloat(i.amount), 0)

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Invoices</h1>
            <button
              style={{ backgroundColor: "#62e18b" }}
              className="px-6 py-3 rounded-lg text-black font-semibold hover:opacity-90 transition flex items-center gap-2"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="w-5 h-5" />
              Create Invoice
            </button>
          </div>
          <p className="text-gray-600">Manage and track all invoices and payments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Invoices</p>
                <p className="text-3xl font-bold text-gray-900">{invoices.length}</p>
              </div>
              <FileText style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Paid</p>
                <p className="text-3xl font-bold text-gray-900">{paidCount}</p>
              </div>
              <Check style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
              </div>
              <Clock style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign style={{ color: "#62e18b" }} className="w-10 h-10" />
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Invoice #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issue Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Due Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText style={{ color: "#62e18b" }} className="w-5 h-5" />
                      <span className="font-semibold text-gray-900">{invoice.invoiceNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{invoice.patientName}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.doctorName}</td>
                  <td className="px-6 py-4">
                    <span style={{ color: "#62e18b" }} className="font-bold">
                      ${invoice.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{invoice.date}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.dueDate}</td>
                  <td className="px-6 py-4">
                    <span
                      style={{
                        backgroundColor:
                          invoice.status === "Paid" ? "#62e18b" : invoice.status === "Pending" ? "#fcd34d" : "#ef4444",
                      }}
                      className="px-3 py-1 rounded-full text-sm font-semibold text-black"
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(invoice)}
                        className="p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(invoice.id)}
                        className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <InvoiceDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        invoice={selectedInvoice}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        invoiceNumber={invoices.find((i) => i.id === deletingInvoiceId)?.invoiceNumber}
      />

      <AddInvoiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddInvoice}
      />
    </div>
  )
}

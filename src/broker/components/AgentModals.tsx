import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

const font = { fontFamily: 'Arial, sans-serif' } as const
const accent = '#A49776'

type ApproveAgentModalProps = {
  open: boolean
  agentName: string
  license: string
  onClose: () => void
  onApprove: () => void
}

export function ApproveAgentModal({ open, agentName, license, onClose, onApprove }: ApproveAgentModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" aria-label="Close" onClick={onClose} />
      <div
        className="relative w-full max-w-[400px] rounded-xl bg-white p-6 shadow-xl text-center"
        style={font}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="approve-title"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FDE8E8]">
          <HelpCircle className="h-8 w-8 text-[#DC2626]" strokeWidth={2} />
        </div>
        <h2 id="approve-title" className="text-xl font-bold text-[#111827] mb-2">
          Are You Sure?
        </h2>
        <p className="text-sm text-[#374151] mb-4">Are you sure you want to approve this agent?</p>
        <div className="rounded-lg bg-[#F5F5F5] px-4 py-3 text-left text-sm mb-6 space-y-1">
          <p>
            <span className="font-bold">Agent Name:</span> {agentName}
          </p>
          <p>
            <span className="font-bold">License:</span> {license}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 border border-[#D1D5DB] bg-white text-[#111827] text-sm rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onApprove()
              onClose()
            }}
            className="flex-1 h-10 text-white text-sm rounded-md"
            style={{ backgroundColor: accent }}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  )
}

type RemoveAgentModalProps = {
  open: boolean
  onClose: () => void
  onRemove: () => void
}

export function RemoveAgentModal({ open, onClose, onRemove }: RemoveAgentModalProps) {
  const [opt1, setOpt1] = useState(true)
  const [opt2, setOpt2] = useState(true)

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" aria-label="Close" onClick={onClose} />
      <div className="relative w-full max-w-[400px] rounded-xl bg-white p-6 shadow-xl text-center" style={font} role="dialog">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FDE8E8]">
          <HelpCircle className="h-8 w-8 text-[#DC2626]" strokeWidth={2} />
        </div>
        <h2 className="text-xl font-bold text-[#111827] mb-2">Are You Sure?</h2>
        <p className="text-sm text-[#374151] mb-4">Are you sure you want to remove this agent?</p>
        <div className="rounded-lg border border-[#E5E7EB] bg-[#F9F9F9] px-4 py-3 text-left text-sm mb-4">
          <p className="font-bold text-center mb-2 text-[#111827]">This action will:</p>
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="checkbox" checked={opt1} onChange={(e) => setOpt1(e.target.checked)} className="rounded border-gray-400" />
            <span>Remove agent from agency</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={opt2} onChange={(e) => setOpt2(e.target.checked)} className="rounded border-gray-400" />
            <span>Unassign listings</span>
          </label>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 border border-[#D1D5DB] bg-white text-[#111827] text-sm rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onRemove()
              onClose()
            }}
            className="flex-1 h-10 text-white text-sm rounded-md"
            style={{ backgroundColor: accent }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

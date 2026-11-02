import React from 'react'
import { Sparkles } from 'lucide-react'
import { Card, PageTitle } from '../ui'

export default function CompanionPage() {
  return <><PageTitle eyebrow="AI COMPANION" title="A calmer space to check in" text="A fictional wellbeing companion that keeps privacy and consent visible." /><Card><span className="round-icon"><Sparkles /></span><h2>How are you feeling today?</h2><p className="page-subtitle">Your companion is not a diagnosis or emergency service. You stay in control of memory and sharing.</p></Card></>
}

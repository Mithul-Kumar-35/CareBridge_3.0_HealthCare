import React from 'react'
import { Card, PageTitle } from '../ui'

export default function CompanionSettingsPage() {
  return <><PageTitle eyebrow="PRIVACY" title="AI and privacy settings" text="Choose what the companion can remember and use." /><Card><label className="switch-label"><input type="checkbox" defaultChecked /> <span>Allow recent conversation context</span></label></Card></>
}

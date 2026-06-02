export type SubscriptionTier = 'free' | 'pro' | 'team' | 'enterprise'

export type BillingInterval = 'monthly' | 'yearly'

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing' | 'paused'

export interface Subscription {
  id: string
  userId: string
  organizationId: string
  tier: SubscriptionTier
  status: SubscriptionStatus
  interval: BillingInterval
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  trialEnd?: string
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  paymentProvider: 'stripe' | 'mercadopago' | 'paypal' | 'culqi'
  createdAt: string
  updatedAt: string
}

export interface Plan {
  id: string
  name: string
  tier: SubscriptionTier
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: PlanFeatures
  currency: string
  popular: boolean
}

export interface PlanFeatures {
  maxProjects: number
  maxChats: number
  maxDocuments: number
  maxStorage: number
  maxTeamMembers: number
  allowedModes: string[]
  maxApiCalls: number
  googleIntegration: boolean
  obsidianIntegration: boolean
  mcpAccess: boolean
  desktopApp: boolean
  terminalAccess: boolean
  computerControl: boolean
  imageGeneration: boolean
  videoGeneration: boolean
  customModels: boolean
  apiAccess: boolean
  prioritySupport: boolean
  auditLogs: boolean
}

export interface Invoice {
  id: string
  subscriptionId: string
  amount: number
  currency: string
  status: 'paid' | 'open' | 'void' | 'uncollectible'
  periodStart: string
  periodEnd: string
  paidAt?: string
  pdfUrl?: string
  createdAt: string
}

export interface UsageEvent {
  id: string
  userId: string
  type: 'api_call' | 'message' | 'storage' | 'image_gen' | 'video_gen' | 'tool_call'
  quantity: number
  modelId?: string
  metadata?: Record<string, unknown>
  timestamp: string
}

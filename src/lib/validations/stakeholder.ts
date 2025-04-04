import { z } from 'zod';

// Basic information schema
export const stakeholderBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  role: z.string().min(1, "Role is required"),
  responsibilities: z.array(z.string()),
});

// Organization chart schema
export const orgChartSchema = z.object({
  organizationLevel: z.enum(["executive", "senior_management", "middle_management", "operational", "external"])
    .optional()
    .or(z.literal('')),
  decisionMakingRole: z.enum(["decision_maker", "influencer", "recommender", "implementer", "end_user", "gatekeeper"])
    .optional()
    .or(z.literal('')),
  reportsTo: z.string().optional().or(z.literal('')),
});

// Influence and interest schema
export const influenceInterestSchema = z.object({
  influence: z.number().min(0).max(100),
  interest: z.number().min(0).max(100),
  disposition: z.enum(["champion", "supporter", "neutral", "critic", "blocker"])
    .optional()
    .or(z.literal('')),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional().or(z.literal('')),
});

// Communication strategy schema
export const strategySchema = z.object({
  communicationFrequency: z.enum(["daily", "weekly", "biweekly", "monthly", "quarterly", "as_needed"])
    .optional()
    .or(z.literal('')),
  communicationChannel: z.enum(["email", "phone", "in_person", "video", "presentation", "formal_report"])
    .optional()
    .or(z.literal('')),
  engagementStrategy: z.string().optional().or(z.literal('')),
  keyMessages: z.array(z.string()).default([]),
});

// Complete stakeholder schema
export const stakeholderSchema = stakeholderBaseSchema
  .merge(orgChartSchema)
  .merge(influenceInterestSchema)
  .merge(strategySchema)
  .merge(z.object({
    id: z.string(),
  }));

// New stakeholder schema (without ID)
export const newStakeholderSchema = stakeholderBaseSchema
  .merge(orgChartSchema)
  .merge(influenceInterestSchema)
  .merge(strategySchema);

export type StakeholderFormValues = z.infer<typeof stakeholderSchema>;
export type NewStakeholderFormValues = z.infer<typeof newStakeholderSchema>;

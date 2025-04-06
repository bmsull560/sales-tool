import { mockStakeholders, mockRelationships } from "@/lib/mock-data";

export async function getPersonasData() {
  // This would be a Supabase or other database fetch in a real application
  // Following the user's requirements for Supabase integration
  return {
    stakeholders: mockStakeholders,
    relationships: mockRelationships
  };
}

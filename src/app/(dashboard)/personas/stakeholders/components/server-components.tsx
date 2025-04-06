import { mockStakeholders, mockRelationships } from "@/lib/mock-data";
import { Stakeholder, Relationship } from "@/lib/types";

export async function getStakeholdersData() {
  // This would be an API call in a real application
  return {
    stakeholders: mockStakeholders,
    relationships: mockRelationships
  };
}

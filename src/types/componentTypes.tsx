import { InterventionType } from ".";

export interface InterventionCardProps {
  data: InterventionType;
  statusHandler: () => void;
}

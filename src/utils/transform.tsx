import { InterventionResponseType, UserResponseType } from "../types";

export const transformUsers = (unformatted: UserResponseType) => {
  return {
    idx: unformatted.idx,
    email: unformatted.email,
    firstName: unformatted.first_name,
    lastName: unformatted.last_name,
    phone: unformatted.phone,
    isActive: unformatted.is_active,
  };
};

export const transformIntervention = (
  unformatted: InterventionResponseType
) => {
  return {
    idx: unformatted.idx,
    title: unformatted.title,
    description: unformatted.description,
    isActive: unformatted.is_active,
  };
};

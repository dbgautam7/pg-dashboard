import { useQuery } from "@tanstack/react-query";
import type {
  UserType,
  ListType,
  InterventionType,
  UserResponseType,
  InterventionResponseType,
  IPostResponseType,
} from "../types";
import { backendApi } from "../utils/axios";
import { transformIntervention, transformUsers } from "../utils/transform";

const pageSize = 10;

export const useUsersData = () =>
  useQuery<ListType<UserType>>(["users"], async () => {
    const { data } = await backendApi.get(`user/?page_size=${pageSize}`);
    data.results = data.results.map((each: UserResponseType) =>
      transformUsers(each)
    );

    return data;
  });

export const useInterventionsData = () =>
  useQuery<ListType<InterventionType>>(["interventions"], async () => {
    const { data } = await backendApi.get(
      `super-dashboard/intervention/?page_size=${pageSize}`
    );
    data.results = data.results.map((each: InterventionResponseType) =>
      transformIntervention(each)
    );
    return data;
  });

export const useSuperPostsData = () =>
  useQuery<ListType<IPostResponseType>>(["users"], async () => {
    const { data } = await backendApi.get(
      `super-dashboard/post/?page_size=${pageSize}`
    );
    data.results = data.results.map((each: UserResponseType) =>
      transformUsers(each)
    );

    return data;
  });

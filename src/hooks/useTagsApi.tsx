import { getAllTags } from "@/apis/tags";
import { useQuery } from "react-query";

export const useTagList = () =>
  useQuery(['useTagList'], () => getAllTags(), {
    refetchOnWindowFocus: true,
  });
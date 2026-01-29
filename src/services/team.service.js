
import { API } from "./auth.service";

export const createTeam = async (payload) => {
const { data } = await API.post("/teams", payload);
return data;
};


export const addTeamMember = async (payload) => {
const { data } = await API.post("/teams/add-member", payload);
return data;
};


export const fetchMyTeams = async () => {
const { data } = await API.get("/teams/my-teams");
return data;
};
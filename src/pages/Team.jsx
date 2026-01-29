import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTimes,
  faUserPlus,
  faCheckCircle,
  faUser,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useContacts } from "../store/contactSelection.store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createTeam, fetchMyTeams, updateTeamService } from "../services/team.service";

const TeamCreationPage = () => {
  // 1. State for Custom Roles
  const [roles, setRoles] = useState([
    "Founder",
    "Co-Founder",
    "Lead Developer",
    "Product Designer",
    "Freelancer",
  ]);
  const [newRole, setNewRole] = useState("");

  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isTeamPresent, setIsTeamPresent] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [myTeam, setMyTeam]=useState([]);

  // 2. State for Contacts and Search
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContact] = useState([]);

  // 3. State for Final Team
  const [team, setTeam] = useState([]);

  const addMemberToTeam = (contact, role) => {
    if (!role) return toast.warn("Please select a role first!");

    const result = team?.filter(
      (val) => val.id?.toString() === contact.user?._id?.toString(),
    );

    if (result?.length > 0) {
      toast.warn("user already assigned", { autoClose: 2000 });
      return;
    }

    console.log(contact);

    const newMember = {
      id: contact.user?._id,
      username: contact?.user?.username,
      assignedRole: role,
    };

    setTeam([...team, newMember]);
  };

  const removeMember = (id) => setTeam(team?.filter((m) => m.id !== id));

  const getContactCall = useContacts((state) => state.getContactCall);

  const fetchMyContact = async () => {
    try {
      const res = await getContactCall();
      // console.log(res);
      setContact(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyTeam = async () => {
    try {
      const res = await fetchMyTeams();
      console.log(res?.teams[0]);

      const fetchedTeams = res.teams[0]?.members?.map((val) => ({
        id: val?.userId?._id,
        username: val?.userId?.username,
        assignedRole: val?.role,
      }));
      // console.log(fetchedTeams);
      if (fetchedTeams?.length > 0) {
        setIsTeamPresent(true);
      }

      setMyTeam(res?.teams[0]||[])
      setTeam(fetchedTeams || []);
      setTeamName(res.teams[0]?.name);
      setDescription(res.teams[0]?.description);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyContact();

    getMyTeam();
  }, []);

  const handleCreateTeam = async () => {
    try {
      // console.log(team);

      const payload = {
        name: teamName||"",
        description,
        avatar,
        members: team?.map((user) => ({
          userId: user?.id,
          role: user.assignedRole || "member",
        })),
      };

      // console.log(payload);

      if (isEdit) {
        // console.log(myTeam);
        
        const res = await updateTeamService(payload,myTeam._id);
      console.log(res);

      const fetchedTeams = res.members?.map((val) => ({
        id: val?.userId?._id,
        username: val?.userId?.username,
        assignedRole: val?.role,
      }));
     

      setMyTeam(res||[])
      setTeam(fetchedTeams || []);
      setTeamName(res?.name||"");
      setDescription(res?.description);




      if (res) {
        toast.success("team updated successfully");
      }

      // console.log("Team created:", res.team);

      } else {
        const res = await createTeam(payload);
        console.log(res);
        if (res) {
          toast.success("team created successfully");
        }

        console.log("Team created:", res.team);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response?.data?.message);
      }
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen p-8 font-sans"
      style={{ backgroundColor: "#DDDCDB" }}
    >
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Top Section: Define & Add */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 border-b border-gray-100">
          {/* Column 1: Define Team Roles */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#3C4044] uppercase tracking-tight">
              Define Team Roles
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="New Position Name"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="flex-1 p-3 border-2 border-[#EDBF9B] rounded-xl focus:outline-none focus:border-[#FD7B41]"
              />
              <button
                onClick={() => {
                  if (newRole) setRoles([...roles, newRole]);
                  setNewRole("");
                }}
                className="bg-[#3C4044] text-white px-6 rounded-xl hover:bg-[#FD7B41] transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="px-4 py-2 bg-[#EDBF9B]/30 text-[#3C4044] font-bold rounded-full border border-[#EDBF9B] text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Add & Assign Members */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#3C4044] uppercase tracking-tight">
              Add & Assign
            </h2>
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-4 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Contacts..."
                className="w-full pl-12 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#FD7B41]"
                onChange={(e) => setSearchTerm(e?.target?.value?.toLowerCase())}
              />
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 max-h-60 overflow-y-auto space-y-3">
              {contacts
                ?.filter((c) =>
                  c?.user?.username?.toLowerCase().includes(searchTerm),
                )
                .map((contact) => (
                  <div
                    key={contact?.user._id}
                    className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      {contact?.user?.avatar ? (
                        <img
                          src={contact?.user?.avatar}
                          className="w-10 h-10 rounded-full"
                          alt=""
                        />
                      ) : (
                        <FontAwesomeIcon icon={faUser} />
                      )}
                      <span className="font-bold text-[#3C4044]">
                        {contact?.user?.fullName}
                      </span>
                    </div>
                    <select
                      onChange={(e) => addMemberToTeam(contact, e.target.value)}
                      className="text-xs font-bold text-[#FD7B41] bg-transparent border-none focus:ring-0 cursor-pointer"
                    >
                      <option value="">Assign Role +</option>
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Current Team Grid */}
        <div className="p-10 bg-[#f9f9f9]">
          <div className="flex justify-between">
            <h2 className="text-xl font-black text-[#3C4044] uppercase text-center mb-10">
              Current Team
            </h2>
            {isTeamPresent && (
              <button
                onClick={() => setIsEdit(true)}
                className=" cursor-pointer "
              >
                <FontAwesomeIcon icon={faEdit} className="px-2" /> {isEdit?"Editing..":"Edit"}
              </button>
            )}
          </div>

          <div className="space-y-5 w-full">
            {/* Team Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Team Name
              </label>
              <input
                readOnly={isTeamPresent && !isEdit}
                type="text"
                value={teamName||""}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this team about?"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team?.length === 0 && (
              <p className="col-span-full text-center text-gray-400 italic">
                No members assigned yet.
              </p>
            )}
            {team?.map((member, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white rounded-2xl shadow-md border-l-4 border-[#FD7B41] group"
              >
                {member?.user?.avatar ? (
                  <img
                    src={member?.user?.avatar}
                    className="w-12 h-12 rounded-full mr-4"
                    alt=""
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-black text-[#3C4044] text-sm uppercase">
                    {member?.username}
                  </h4>
                  <p className="text-xs font-bold text-[#EDBF9B]">
                    {member.assignedRole}
                  </p>
                </div>
                <button
                  onClick={() => removeMember(member.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={handleCreateTeam}
              className="bg-[#FD7B41] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-transform active:scale-95"
            >
              Save Team & Notify{" "}
              <FontAwesomeIcon icon={faCheckCircle} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCreationPage;

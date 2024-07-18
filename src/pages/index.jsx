import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Organization from "@/components/customComponents/Organization";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [newOrg, setNewOrg] = useState("");
  const [newStatus, setNewStatus] = useState("conversation");
  const [orgList, setOrgList] = useState(null);

  // Load organization data
  useEffect(() => {
    const storedOrgs = localStorage.getItem("orgList");
    if (storedOrgs) {
      setOrgList(JSON.parse(storedOrgs));
    } else {
      setOrgList([]);
    }
  }, []);

  // Save organization data
  useEffect(() => {
    if (orgList == null) {
      return;
    }
    localStorage.setItem("orgList", JSON.stringify(orgList));
  }, [orgList]);

  const handleAddOrg = (event) => {
    setNewOrg(event.target.value);
  };

  const handleStatusChange = (value) => {
    setNewStatus(value);
  };

  const addOrg = () => {
    const org = {
      id: orgList.length === 0 ? 1 : orgList[orgList.length - 1].id + 1,
      orgName: newOrg,
      temperature: "",
      status: newStatus,
      users: [],
      notes: "", // Initialize notes
    };
    setOrgList([...orgList, org]);
    setNewOrg("");
    setNewStatus("conversation");
  };

  const handleDeleteOrg = (id) => {
    setOrgList(orgList.filter((org) => org.id !== id));
  };

  const addUserToOrg = (orgId, newUser) => {
    const updatedOrgs = orgList.map((org) => {
      if (org.id === orgId) {
        return { ...org, users: [...org.users, newUser] };
      }
      return org;
    });
    setOrgList(updatedOrgs);
  };

  const updateOrgDetails = (orgId, updatedDetails) => {
    const updatedOrgs = orgList.map((org) => {
      if (org.id === orgId) {
        return { ...org, ...updatedDetails };
      }
      return org;
    });
    setOrgList(updatedOrgs);
  };

  if (orgList == null) {
    return <p>loading</p>;
  }

  const statuses = [
    "conversation",
    "prospect",
    "outbound",
    "demo",
    "sale",
    "dead",
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-slate-200 w-full items-center justify-between flex p-2 mb-4">
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Enter an organization"
            onChange={handleAddOrg}
            value={newOrg}
            className="border rounded-md p-2"
          />
          <Select onValueChange={handleStatusChange} value={newStatus}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status} className="">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={addOrg} className="bg-green-600">
          Add Organization
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div
            key={status}
            className="flex flex-col items-center p-4 bg-gray-100 rounded-md"
          >
            <h2 className="text-xl font-bold mb-2">{status}</h2>
            <div className="flex flex-col gap-2 w-full">
              {orgList
                .filter((org) => org.status === status)
                .map((org) => (
                  <Organization
                    key={org.id}
                    id={org.id}
                    orgName={org.orgName}
                    handleDeleteOrg={handleDeleteOrg}
                    temperature={org.temperature}
                    status={org.status}
                    users={org.users}
                    notes={org.notes}
                    addUserToOrg={addUserToOrg}
                    updateOrgDetails={updateOrgDetails}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

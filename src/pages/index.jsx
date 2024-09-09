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

import { API_URL } from "@/lib/urls";

export default function Home() {
  const [newOrg, setNewOrg] = useState("");
  const [temperature, setTemperature] = useState("");
  const [newStatus, setNewStatus] = useState("conversation");
  const [orgList, setOrgList] = useState([]);
  const [notes, setNotes] = useState("");

  // Load organization data
  useEffect(() => {
    // const storedOrgs = localStorage.getItem("orgList");
    // setOrgList(storedOrgs ? JSON.parse(storedOrgs) : []);
    (async () => {
      const results = await fetch(`${API_URL}/organizations`, {
        mode: "cors",
        credentials: "include",
        cache: "no-store",
      });
      const data = await results.json();
      setOrgList(data.organizations);
    })();
  }, []);

  // Save organization data
  useEffect(() => {
    if (orgList.length > 0) {
      localStorage.setItem("orgList", JSON.stringify(orgList));
    }
  }, [orgList]);

  const handleAddOrg = (event) => setNewOrg(event.target.value);

  const handleStatusChange = (value) => setNewStatus(value);

  const addOrg = async () => {
    const formattedOrgName = newOrg.trim();
    const setTemperature = temperature;
    const org = {
      name: formattedOrgName,
      temperature: "cold",
      status: newStatus,
      notes: "",
    };

    try {
      const response = await fetch(`${API_URL}/organizations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(org),
        mode: "cors",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();
      console.log(data);
      setOrgList((prevOrgList) => [...prevOrgList, data.organization]);
      setNewOrg("");
      // setNewStatus("conversation");
    } catch (error) {
      console.error("Error adding organization:", error);
    }
  };

  const deleteOrg = async (id) => {
    try {
      const response = await fetch(`${API_URL}/organizations/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();
      console.log(data);
      setOrgList(orgList.filter((org) => org.id != id));

      // setNewStatus("conversation");
    } catch (error) {
      console.error("Error adding organization:", error);
    }
  };

  const handleDeleteOrg = (id) => {
    setOrgList((prevOrgList) => prevOrgList.filter((org) => org.id !== id));
  };

  const addUserToOrg = (orgId, newUser) => {
    console.log();
  };

  const deleteUserFromOrg = (orgId, userId) => {};

  const updateOrgDetails = (orgId, updatedDetails) => {
    const updatedOrgs = orgList.map((org) =>
      org.id === orgId ? { ...org, ...updatedDetails } : org
    );
    setOrgList(updatedOrgs);
  };

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
      <div className="bg-blue-200 w-full flex p-4 mb-6 rounded-lg shadow-lg">
        <div className="flex gap-4 items-center w-full">
          <Input
            placeholder="Enter an organization"
            onChange={handleAddOrg}
            value={newOrg}
            className="flex-grow border rounded-md p-2"
          />
          <Select onValueChange={handleStatusChange} value={newStatus}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={addOrg} className="bg-green-600">
            Add Organization
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div key={status} className="bg-gray-200 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 capitalize">{status}</h2>
            <div className="flex flex-col gap-2">
              {orgList.filter((org) => org.status === status).length === 0 ? (
                <p className="text-center text-gray-500">
                  No organizations in this status
                </p>
              ) : (
                orgList
                  .filter((org) => org.status === status)
                  .map((org) => (
                    <Organization
                      key={org.id}
                      id={org.id}
                      name={org.name} // Ensure `org.name` is correct here
                      handleDeleteOrg={deleteOrg}
                      temperature={org.temperature}
                      status={org.status}
                      users={org.users}
                      notes={org.notes}
                      addUserToOrg={addUserToOrg}
                      deleteUserFromOrg={deleteUserFromOrg}
                      updateOrgDetails={updateOrgDetails}
                      expandView
                    />
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

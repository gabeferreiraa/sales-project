import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Organization from "@/components/customComponents/Organization";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [newOrg, setNewOrg] = useState("");
  const [orgList, setOrgList] = useState(null);

  // Load organization data from local storage when the component mounts
  useEffect(() => {
    const storedOrgs = localStorage.getItem("orgList");
    if (storedOrgs) {
      setOrgList(JSON.parse(storedOrgs));
    } else {
      setOrgList([]);
    }
  }, []);

  // Save organization data to local storage whenever orgList changes
  useEffect(() => {
    if (orgList == null) {
      return
    }
    localStorage.setItem("orgList", JSON.stringify(orgList));
  }, [orgList]);

  const handleAddOrg = (event) => {
    setNewOrg(event.target.value);
  };

  const addOrg = () => {
    const org = {
      id: orgList.length === 0 ? 1 : orgList[orgList.length - 1].id + 1,
      orgName: newOrg,
      temperature: "",
      status: "",
      users: [],
    };
    setOrgList([...orgList, org]);
  };

  const handleDeleteOrg = (id) => {
    setOrgList(orgList.filter((org) => org.id !== id));
  };

  if (orgList == null) {
    return (
    <p> loading</p>
    )
  }
  return (
    <div className="block">
      <div className="bg-slate-200 w-full items-center justify-between flex p-2">
        <div className="flex gap-4 items-center">
          <input
            placeholder="Enter an organization"
            onChange={handleAddOrg}
            value={newOrg}
            className="border rounded-md p-2"
          />
        </div>
        <Button onClick={addOrg} className="bg-green-600">
          Add Organization
        </Button>
      </div>
      <div>
        {orgList.map((org) => ( 
          <Organization
            key={org.id}
            id={org.id}
            orgName={org.orgName}
            handleDeleteOrg={handleDeleteOrg}
            temperature={org.temperature}
            status="beginning"
            users={"John"}
          />
        ))}
      </div>
    </div>
  );
}

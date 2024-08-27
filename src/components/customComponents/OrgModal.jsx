import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import UserProfile from "./User";

class User {
  constructor(
    org,
    first_name,
    last_name,
    email,
    avatar = "",
    is_lead = false,
    job_title = "",
    userNotes = ""
  ) {
    this.org = org;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.avatar = avatar;
    this.is_lead = is_lead;
    this.job_title = job_title;
    this.userNotes = userNotes;
  }
}

const OrgModal = ({
  open,
  onClose,
  orgDetails,
  addUserToOrg,
  handleDeleteOrg,
  updateOrgDetails,
}) => {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [is_lead, setis_lead] = useState(false);
  const [job_title, setjob_title] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [orgNotes, setOrgNotes] = useState(orgDetails.notes || "");
  const [status, setStatus] = useState(orgDetails.status || "");

  useEffect(() => {
    setOrgNotes(orgDetails.notes || "");
    setStatus(orgDetails.status || "");
  }, [orgDetails]);

  const handleAddUser = () => {
    const newUser = new User(
      orgDetails.orgName,
      first_name,
      last_name,
      email,
      avatar,
      is_lead,
      job_title,
      userNotes
    );
    addUserToOrg(orgDetails.id, newUser);
    setfirst_name("");
    setlast_name("");
    setEmail("");
    setAvatar("");
    setis_lead(false);
    setjob_title("");
    setUserNotes("");
  };

  const handleDelete = () => {
    handleDeleteOrg(orgDetails.id);
    onClose();
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    updateOrgDetails(orgDetails.id, { status: value });
  };

  const handleOrgNotesChange = (e) => {
    setOrgNotes(e.target.value);
    updateOrgDetails(orgDetails.id, { notes: e.target.value });
  };

  const handleUserNotesChange = (e, email) => {
    const updatedUsers = orgDetails.users.map((user) => {
      if (user.email === email) {
        user.userNotes = e.target.value;
      }
      return user;
    });
    updateOrgDetails(orgDetails.id, { users: updatedUsers });
  };

  // sorts for lead to be on top
  const sortedUsers = [...orgDetails.users].sort(
    (a, b) => b.is_lead - a.is_lead
  );

  return (
    <div className="font-sans">
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <Drawer>
            <DrawerTrigger open={open}>Open</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Organization Details</DrawerTitle>
                <DrawerDescription>
                  <div className="flex gap-20 min-h-96">
                    <div className="w-96 p-4 gap-12 flex flex-col">
                      <div className="flex flex-col gap-6 font-bold">
                        <h1 className="text-3xl text-black">
                          {orgDetails.orgName}
                        </h1>
                        {/* <p className="text-sm">ORG Location</p>
                        <p className="text-sm">ORG Hours</p> */}
                      </div>
                      <div className="flex flex-col">
                        <h3>Organization Notes:</h3>
                        <textarea
                          value={orgNotes}
                          onChange={handleOrgNotesChange}
                          className="border rounded-md p-2 mt-2"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-96 gap-2">
                      <h3>Add User:</h3>
                      <Input
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setfirst_name(e.target.value)}
                        className="border rounded-md p-2 mt-2"
                      />
                      <Input
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setlast_name(e.target.value)}
                        className="border rounded-md p-2 mt-2"
                      />
                      <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-md p-2 mt-2"
                      />
                      <Input
                        placeholder="Job Title"
                        value={job_title}
                        onChange={(e) => setjob_title(e.target.value)}
                        className="border rounded-md p-2 mt-2"
                      />
                      <div className="flex items-center mt-2">
                        <Checkbox
                          checked={is_lead}
                          onCheckedChange={(checked) => setis_lead(checked)}
                        />
                        <label className="ml-2">Is Lead</label>
                      </div>
                      <Button onClick={handleAddUser} className="">
                        Add User
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2 w-96">
                      <h3>Users:</h3>
                      {sortedUsers.map((user) => (
                        <UserProfile
                          key={user.email}
                          user={user}
                          handleUserNotesChange={handleUserNotesChange}
                        />
                      ))}
                    </div>
                    <Button
                      className="fixed left-4 bottom-4"
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      Delete Organization
                    </Button>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrgModal;

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
    firstName,
    lastName,
    email,
    avatar = "",
    is_lead = false,
    jobTitle = "",
    userNotes = ""
  ) {
    this.org = org;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
    this.is_lead = is_lead;
    this.jobTitle = jobTitle;
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLead, setIsLead] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
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
      firstName,
      lastName,
      email,
      avatar,
      isLead,
      jobTitle,
      userNotes
    );
    addUserToOrg(orgDetails.id, newUser);
    setFirstName("");
    setLastName("");
    setEmail("");
    setAvatar("");
    setIsLead(false);
    setJobTitle("");
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
                  <div className="flex gap-10 min-h-96">
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border rounded-md p-2 mt-2"
                      />
                      <Input
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="border rounded-md p-2 mt-2"
                      />
                      <div className="flex items-center mt-2">
                        <Checkbox
                          checked={isLead}
                          onCheckedChange={(checked) => setIsLead(checked)}
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
                      className="fixed right-2 bottom-2"
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

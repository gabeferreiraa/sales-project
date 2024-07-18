import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a Checkbox component in your UI library
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

class User {
  constructor(
    org,
    firstName,
    lastName,
    email,
    avatar = "",
    is_lead = false,
    jobTitle = ""
  ) {
    this.org = org;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
    this.is_lead = is_lead;
    this.jobTitle = jobTitle;
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
  const [notes, setNotes] = useState(orgDetails.notes || "");
  const [status, setStatus] = useState(orgDetails.status || "");

  useEffect(() => {
    setNotes(orgDetails.notes || "");
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
      jobTitle
    );
    addUserToOrg(orgDetails.id, newUser);
    setFirstName("");
    setLastName("");
    setEmail("");
    setAvatar("");
    setIsLead(false);
    setJobTitle("");
  };

  const handleDelete = () => {
    handleDeleteOrg(orgDetails.id);
    onClose();
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    updateOrgDetails(orgDetails.id, { status: value });
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    updateOrgDetails(orgDetails.id, { notes: e.target.value });
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
                  <div className="flex gap-10">
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
                    <div className="flex flex-col w-96 gap-2">
                      <h3>Organization Notes:</h3>
                      <Input
                        placeholder="Notes"
                        value={notes}
                        onChange={handleNotesChange}
                        className="border rounded-md p-2 mt-2"
                      />
                      <h3>Organization Status:</h3>
                      <Select value={status} onValueChange={handleStatusChange}>
                        <SelectTrigger>
                          <span>{status}</span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conversation">
                            Conversation
                          </SelectItem>
                          <SelectItem value="prospect">Prospect</SelectItem>
                          <SelectItem value="outbound">Outbound</SelectItem>
                          <SelectItem value="demo">Demo</SelectItem>
                          <SelectItem value="sale">Sale</SelectItem>
                          <SelectItem value="dead">Dead</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2 w-96">
                      <h3>Users:</h3>
                      {sortedUsers.map((user) => (
                        <div
                          key={user.email}
                          className="flex items-center space-x-2"
                        >
                          <Avatar>
                            <AvatarImage
                              src={user.avatar}
                              alt={`${user.firstName} ${user.lastName}`}
                            />
                            <AvatarFallback>{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className={user.is_lead ? "font-bold" : ""}>
                              {`${user.firstName} ${user.lastName}`}
                            </span>
                            <span>{user.jobTitle}</span>
                          </div>
                        </div>
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

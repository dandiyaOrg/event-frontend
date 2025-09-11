import React from 'react'
import CustomizableTable from "../Components/CustomizableTable"; 
import SearchBar from "../Components/SearchBar";

const allColumns = [
  { key: "name", label: "Name" },
  { key: "whatsappNumber", label: "Whatsapp Number" },
  { key: "email", label: "Email" },
  { key: "dob", label: "DOB" },
  { key: "gender", label: "Gender" },
  
];


const attendeeData = [
  {
    id: 1,
    name: "Ankit Sharma",
    whatsappNumber: "+91 9876543210",
    email: "ankit.sharma@example.com",
    dob: "2000-05-14",
    gender: "Male",
    
  },
  {
    id: 1,
    name: "Ankit Sharma",
    whatsappNumber: "+91 9876543210",
    email: "ankit.sharma@example.com",
    dob: "2000-05-14",
    gender: "Male",
    
  },
  {
    id: 2,
    name: "Priya Khanna",
    whatsappNumber: "+91 8855441122",
    email: "priya.khanna@example.com",
    dob: "1999-08-28",
    gender: "Female",
    
  },
  {
    id: 3,
    name: "Siddharth Gupta",
    whatsappNumber: "+91 9988776655",
    email: "siddharth.gupta@example.com",
    dob: "2001-11-22",
    gender: "Male",
   
  },
  {
    id: 4,
    name: "Riya Singh",
    whatsappNumber: "+91 9123456780",
    email: "riya.singh@example.com",
    dob: "2002-02-10",
    gender: "Female",
   
  },
  {
    id: 5,
    name: "Rahul Jain",
    whatsappNumber: "+91 9911223344",
    email: "rahul.jain@example.com",
    dob: "1998-12-01",
    gender: "Male",
    
  },
];




const Attendee = () => {

  

  return (
    <div className="px-8 min-h-screen bg-gray-50 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Attendee
        </h1>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <SearchBar placeholder="Search events..." className="w-60" />
        
      </div>

      {/* Table */}

     
          <CustomizableTable
            data={attendeeData}
            allColumns={allColumns}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
     
  );
};


export default Attendee

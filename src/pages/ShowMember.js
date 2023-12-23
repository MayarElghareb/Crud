import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMemberContext } from '../context/MemberContext';

const ShowMember = () => {
  const { id } = useParams();
  const { state } = useMemberContext();
  const [member, setMember] = useState({});

  console.log('Members in ShowMember:', state.members);

  useEffect(() => {
    console.log(state.members);
    const memberId = id;

    const memberData = state.members.find((m) => m.id === memberId);
    console.log("first",memberData)
    if (memberData) {
      setMember(memberData);
    }
  }, [id, state.members]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'left', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '400px' }}>
        <h2 className='text-red-600 font-bold underline'>Member Details</h2>
        <p>Name: {member.name}</p>
        <p>Email: {member.email}</p>
        <p>Membership Type: {member.membershipType}</p>
        <p>Contact Number: {member.contactNumber}</p>
        <p>Date of Birth: {member.dateOfBirth}</p>
        <p>Membership Start Date: {member.membershipStartDate}</p>
        <p>Phone Number: {member.phoneNumber}</p>
        <p>ID Number: {member.idNumber}</p>
      </div>
    </div>
  );
};

export default ShowMember;

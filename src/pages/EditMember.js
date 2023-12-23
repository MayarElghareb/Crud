import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemberContext } from '../context/MemberContext';

const EditMember = () => {
  const { id } = useParams();
  const { state, dispatch } = useMemberContext();
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState({});


  useEffect(() => {
    const member = state.members.find((member) => member.id === parseInt(id, 10));
    if (member) {
      setMemberData(member);
    }
  }, [id, state.members]);

  const handleFormSubmit = (e) => {
  e.preventDefault();

  const updatedMemberData = { ...memberData, id: parseInt(id, 10) };
  console.log('State before dispatch:', state);

  dispatch({ type: 'UPDATE_MEMBER', payload: updatedMemberData });
  console.log('State after dispatch:', state);
  console.log('Dispatching UPDATE_MEMBER with payload:', updatedMemberData);

  navigate('/index',{ replace: true });
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  return (
    <div>
      <h2>Edit Member</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name: </label>
        <input type="text" name="name" value={memberData.name || ''} onChange={handleInputChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditMember;

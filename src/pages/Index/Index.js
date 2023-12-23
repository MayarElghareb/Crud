import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMemberContext } from '../../context/MemberContext';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation(); 
  const { state, dispatch } = useMemberContext();
  const [key, setKey] = useState(0);

  const { members } = state;

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    membershipType: '',
    idNumber: '',
    startDateFrom: '',
    startDateTo: '',
    phoneNumber: '',
  });

  const handleDelete = (id) => {
    if (window.confirm(t('Are you sure you want to delete this member?'))) {
      dispatch({ type: 'DELETE_MEMBER', payload: id });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredMembers = members.filter((member) => {
    return (
      member.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      member.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      member.membershipType.toLowerCase().includes(filters.membershipType.toLowerCase()) &&
      (member.idNumber || '').toLowerCase().includes(filters.idNumber.toLowerCase()) &&
      (member.membershipStartDate >= filters.startDateFrom || !filters.startDateFrom) &&
      (member.membershipStartDate <= filters.startDateTo || !filters.startDateTo) &&
      (member.contactNumber || '').includes(filters.phoneNumber)
    );
  });

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
    console.log('State in Index after update:', state);
  }, [state.members]);

  return (
    <div key={key}>
<h1 className='text-red-600 font-bold underline  '>Search Members</h1>

      <form className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="text-gray-600">{t('Name')}</label>
          <input type="text" name="name" value={filters.name} onChange={handleFilterChange} className="border p-2" />
        </div>
        <div>
          <label className="text-gray-600">{t('Email')}</label>
          <input type="text" name="email" value={filters.email} onChange={handleFilterChange} className="border p-2" />
        </div>
        <div>
          <label className="text-gray-600">{t('Membership Type')}</label>
          <input
            type="text"
            name="membershipType"
            value={filters.membershipType}
            onChange={handleFilterChange}
            className="border p-2"
          />
        </div>
        <div>
          <label className="text-gray-600">{t('ID Number')}</label>
          <input type="text" name="idNumber" value={filters.idNumber} onChange={handleFilterChange} className="border p-2" />
        </div>
        <div>
          <label className="text-gray-600">{t('Membership Start Date (From)')}</label>
          <input
            type="date"
            name="startDateFrom"
            value={filters.startDateFrom}
            onChange={handleFilterChange}
            className="border p-2"
          />
        </div>
        <div>
          <label className="text-gray-600">{t('Membership Start Date (To)')}</label>
          <input
            type="date"
            name="startDateTo"
            value={filters.startDateTo}
            onChange={handleFilterChange}
            className="border p-2"
          />
        </div>
        <div>
          <label className="text-gray-600">{t('Phone Number')}</label>
          <input
            type="text"
            name="phoneNumber"
            value={filters.phoneNumber}
            onChange={handleFilterChange}
            className="border p-2"
          />
        </div>
      </form>

  
<div className='w-100 text-end'>
<Link to="/create" className="text-white bg-blue-500 px-4 py-2 rounded ">{t('Create Member')}</Link>

</div>
<h1 className='text-red-600 font-bold underline  '>{t('MemberList')}</h1>


      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">{t('Name')}</th>
            <th className="p-2 text-left">{t('Email')}</th>
            <th className="p-2 text-left">{t('Membership Type')}</th>
            <th className="p-2 text-left">{t('ID Number')}</th>
            <th className="p-2 text-left">{t('Membership Start Date')}</th>
            <th className="p-2 text-left">{t('Phone Number')}</th>
            <th className="p-2 text-left">{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={member.id} className={index % 2 === 0 ? 'bg-white' : 'bg-beige'}>
              <td className="p-2">{member.name}</td>
              <td className="p-2">{member.email}</td>
              <td className="p-2">{member.membershipType}</td>
              <td className="p-2">{member.idNumber}</td>
              <td className="p-2">{member.membershipStartDate}</td>
              <td className="p-2">{member.contactNumber}</td>
              <td className="p-2">
                <Link to={`/show/${member.id}`}>{t('View')}</Link>
                <Link to={`/edit/${member.id}`}>{t('Edit')}</Link>
                <button onClick={() => handleDelete(member.id)}>{t('Delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;

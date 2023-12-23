import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MemberContext = createContext();

const initialState = {
  members: [],
};

const memberReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] };
    case 'DELETE_MEMBER':
      return { ...state, members: state.members.filter((member) => member.id !== action.payload) };
    case 'SET_MEMBERS':
      return { ...state, members: action.payload };
      case 'UPDATE_MEMBER':
        const updatedMembers = state.members.map((member) =>
          JSON.stringify(member.id) === JSON.stringify(action.payload.id)
            ? { ...member, ...action.payload }
            : member
        );
        return { ...state, members: updatedMembers };
    default:
      return state;
  }
};

export const MemberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memberReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/members.json'); 
        const data = await response.json();
        console.log(data, "dd");
        dispatch({ type: 'SET_MEMBERS', payload: data });
      } catch (error) {
        console.error('Error fetching member data', error);
      }
    };

    fetchData();
  }, []);

  return <MemberContext.Provider value={{ state, dispatch }}>{children}</MemberContext.Provider>;
};

export const useMemberContext = () => {
  return useContext(MemberContext);
};

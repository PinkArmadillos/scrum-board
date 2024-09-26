import React, { useContext } from 'react';
import { teamContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

const TeamDisplay = ({ teamName, teamId }) => {

  const navigate = useNavigate();
  const { team, setTeam } = useContext(teamContext);


  // When a button is clicked, sets that team to global context for use in the ScrumBoardPage 
  const selectTeam = (teamId) => {
      setTeam(teamId);
      return navigate('/ScrumBoardPage');
  }

return(
  <div key={teamId}>
    <span>
      {teamName}, <button onClick={() => selectTeam(teamId)}>Select Team</button>
    </span>
  </div>
    )
}

export default TeamDisplay;
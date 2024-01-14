import { useState } from "react";

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
  
    const addSkill = () => {
      if (newSkill.trim() !== '') {
        setSkills([...skills, newSkill]);
        setNewSkill('');
      }
    };
  
    const removeSkill = (index) => {
      const updatedSkills = [...skills];
      updatedSkills.splice(index, 1);
      setSkills(updatedSkills);
    };
  
    return (
      <div>
        <h1>Add Skills</h1>
        {skills.map((skill, index) => (
          <div key={index}>
            Skill {index + 1}: {skill}
            <button onClick={() => removeSkill(index)}>Remove</button>
          </div>
        ))}
        <div>
          {skills.length === 0 && <p>No skills added yet.</p>}
          <div>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter skill"
            />
            <button onClick={addSkill}>Add Skill</button>
          </div>
        </div>
      </div>
    );
};

export default Skills;
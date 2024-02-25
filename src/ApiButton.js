import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';


const ApiButton = styled(Button)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
});

const ApiButtonComponent = ({ text , path}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };


  return (
    <ApiButton onClick={handleClick}>
      {text}
    </ApiButton>
  );
};

export default ApiButtonComponent;

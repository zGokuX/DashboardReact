import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {addName ,selectName } from '../slices/NameSlice';

export function InputName() {
  const dispatch = useDispatch()
  const name = useSelector(selectName).value;
  const [selectUser,setSelectUser] = useState(null)

  function addNameBtn(value){
    dispatch(addName(value))
    console.log(name)
  }

  return (
    <div>
      <form action="#" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder='Scrivi il nome' onChange={(e) => {
          const name = e.target.value
          setSelectUser(name)
        }}/>
        <button onClick={() => addNameBtn(selectUser)}>Invia nome</button>
      </form>
   
    </div>
  );
}
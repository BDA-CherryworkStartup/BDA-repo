import React from 'react';
import Compare from './Compare';

const Temp = () => {
  const text1 = 'As a <<$$job title$$>>, it is the duty of the Employee to perform all essential job functions and duties. From time to time, the Employer You may also add other duties within the reasonable scope of the Employee’s work. This is Variant 1';
  const text2 = 'As a <<$$job title$$>>, it is the duty of the Employee to perform all essential job functions and duties. From time to time, the Employer may also add other duties within the reasonable scope of the Employee’s work. ';

  return (
    <div>
      <Compare text1={text1} text2={text2} />
    </div>
  );
};

export default Temp;
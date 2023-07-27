import React from 'react';

type IconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

type Task = {
  id: number;
  photo: string;
  Icon: IconComponent;
  title: string;
  text: string;
};

export default Task;

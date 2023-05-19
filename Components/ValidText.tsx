import React, {FC} from 'react';
import {Text} from '../styled/Text';

type Props = {
  isValid: boolean;
  text: string;
};
const ValidText: FC<Props> = ({isValid, text}) => (
  <Text color={isValid ? 'green' : 'red'}>{`- ${text}`}</Text>
);

export default ValidText;

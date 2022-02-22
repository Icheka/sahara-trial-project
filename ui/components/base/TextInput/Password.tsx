import { FunctionComponent } from 'react';

import { ITextField, TextField } from './TextField';

export const PasswordField: FunctionComponent<ITextField> = (props) => {
    return <TextField type={`password`} autoComplete={`current-password`} {...props} />;
};

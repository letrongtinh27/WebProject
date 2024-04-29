import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import {useLocation} from 'react-router-dom';

import {
    Form,
    required,
    TextInput,
    useTranslate,
    useLogin,
    useNotify,
} from 'react-admin';

// ----------------------------------------------------------------------
    const Login = () => {
        const theme = useTheme();
        const [showPassword, setShowPassword] = useState(false);

        const handleClick = () => {

        };

        const [loading, setLoading] = useState(false);
        const translate = useTranslate();

        const notify = useNotify();
        const login = useLogin();
        const location = useLocation();

        const handleSubmit = (auth: FormValues) => {
            setLoading(true);
            login(auth, location.state ? (location.state as any).nextPathname : '/').catch((error: Error) => {
                setLoading(false);
                notify(
                    typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                    {
                        type: 'error',
                        messageArgs: {
                            _:
                                error && error.message
                                    ? error.message
                                    : undefined,
                        },
                    }
                );
            });
        };

        const renderForm = (
            <>

            </>
        );

        return (
            <>
                <Form onSubmit={handleSubmit}>


                <Stack alignItems="center" justifyContent="center" sx={{height: 1}}>
                    <Card
                        sx={{
                            p: 5,
                            width: 1,
                            maxWidth: 420,
                        }}
                    >
                        <Typography variant="h4" textAlign={'center'}>Sign in</Typography>

                        <Stack direction="row" spacing={2}>
                        </Stack>

                        <Divider sx={{my: 3}}>
                        </Divider>

                        <Stack spacing={3}>
                            <TextInput
                                autoFocus
                                source="username"
                                label={translate('ra.auth.username')}
                                disabled={loading}
                                validate={required()}
                                fullWidth
                                name={"username"}/>

                            <TextInput
                                source="password"
                                label={translate('ra.auth.password')}
                                type="password"
                                disabled={loading}
                                validate={required()}
                                fullWidth
                                name={"password"}/>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{my: 3}}>
                        </Stack>

                        <Button
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="inherit"
                        >
                            Login
                        </Button>
                    </Card>
                </Stack>
                </Form>
            </>
        );
    }
export default Login;

interface FormValues {
    username?: string;
    password?: string;
}
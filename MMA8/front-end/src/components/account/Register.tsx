import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import agent from '../../app/connApi/agent';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';


export default function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error:string) => {
                if (error.includes('Password')){
                    setError('password', {message: error})
                } else if(error.includes('Email')){
                    setError('email', {message: error})
                } else if(error.includes('Username')){
                    setError('userName', {message: error})
                }
            });
        }
    }


    return (
        <Container component={Paper} maxWidth="sm" sx={{ alignItems: 'center', p: 4, display: 'flex', flexDirection: 'column' }}>

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" 
                onSubmit={handleSubmit((data: any) => 
                    agent.Account.register(data)
                    .then(() => {
                        toast.success('Registration succesfull - you can now login');
                        navigate('/login');
                    })
                    .catch((error) => handleApiErrors(error)))
                } 
                noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('userName', { required: 'Username is required' })}
                    error={!!errors.userName}
                    helperText={errors?.userName?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email address"
                    {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                            message: 'Not a valid email address'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', { 
                        required: 'Password is required',
                        pattern: {
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: 'password does not meet complexity requirements'
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />
                
                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/login'>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
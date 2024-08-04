import Button from '@mui/material/Button';

export default function CustomButton(props) {
    return <Button variant="contained" color="secondary" {...props}>{props.children}</Button>;
}
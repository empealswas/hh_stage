
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();
    
    
    return(
            <IconButtonAnimate sx={{ mr: 1, color: 'text.primary' }} onClick={() => navigate(-1)}>
                <Iconify icon="material-symbols:arrow-back-ios" />
            </IconButtonAnimate>
    );}
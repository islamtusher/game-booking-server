import { Card, CardBody, CardHeader } from 'react-bootstrap';

const FormCard = ({children, header}) => {
    return (
        <Card className='form-contain'>
            <CardHeader>
                {header}                    
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>  
    );
};

export default FormCard;
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router";

export const PropertyDoubleButton = ({current, id}) => {

    const navigate = useNavigate();
    const taskList = () => navigate('/taskList/' + id);
    const applianceList = () => navigate('/applianceList/' + id);

    if (current === "task"){
        return(
            <>
                <Button type="submit" className="my-2 green-button non-card-button" disabled>
                    View Tasks
                </Button>
            
                <Button type="submit" className="my-2 green-button non-card-button" onClick={applianceList}>
                    View Appliances
                </Button>
            </>
        )
    } else {
        return (
            <>
                <Button type="submit" className="my-2 green-button non-card-button" onClick={taskList}>
                    View Tasks
                </Button>
            
                <Button type="submit" className="my-2 green-button non-card-button" disabled>
                    View Appliances
                </Button>
            </>
        )
    }
}
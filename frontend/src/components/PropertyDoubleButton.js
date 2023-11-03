import { Button } from "react-bootstrap"
import { useNavigate } from "react-router";

export const PropertyDoubleButton = ({current}) => {

    const navigate = useNavigate();
    const taskList = () => navigate('/taskList');
    const applianceList = () => navigate('/applianceList');

    if (current === "task"){
        return(
            <>
                <Button type="submit" className="my-2 green-button" onClick={taskList} style={{width: "18rem", height: "3rem"}} disabled>
                    View Tasks
                </Button>
            
                <Button type="submit" className="my-2 green-button" onClick={applianceList} style={{width: "18rem", height: "3rem"}} >
                    View Appliances
                </Button>
            </>
        )
    } else {
        return (
            <>
                <Button type="submit" className="my-2 green-button" onClick={taskList} style={{width: "18rem", height: "3rem"}} >
                    View Tasks
                </Button>
            
                <Button type="submit" className="my-2 green-button" onClick={applianceList} style={{width: "18rem", height: "3rem"}} disabled>
                    View Appliances
                </Button>
            </>
        )
    }
}
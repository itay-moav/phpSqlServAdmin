import { Button } from "react-bootstrap";
import { Jumbotron, OperationCard } from "../../../../../../components/atoms";

export default function TableOperations(){

    return (
        <Jumbotron>
            <OperationCard title="Delete Stuff">
                <Button variant="link">Reset and Empty table: <code>TRUNCATE TABLE</code></Button><br />
                <Button variant="link">Empty table: <code>DELETE FROM </code></Button><br />
                <Button variant="link">DROP TABLE</Button>
                
            </OperationCard>
            <OperationCard title="Rename & Move">hohohoho</OperationCard>
            <OperationCard title="Some other bullshit">hohohoho</OperationCard>
        </Jumbotron>



    );
}
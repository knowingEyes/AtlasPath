import { useCities } from "../hooks/useCities";
import { Message } from "./Message";

export const Countries = () => {
    const { visitedCities } = useCities();
    if (!visitedCities.length) return <Message message="No countries to display. Start exploring!" centerMessage={true}/>;
  return (
    <div>Countries</div>
  )
}

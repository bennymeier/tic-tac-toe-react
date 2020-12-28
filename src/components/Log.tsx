export interface Log {
  text: string;
  datetime: string;
  player: string;
}

const LogComponent: React.FC<Log> = (props) => {
  const { player, datetime, text } = props;
  return (
    <li className={`log player-${player}`}>
      <span className="datetime">{datetime}</span>
      <p className="text">{text}</p>
    </li>
  );
};

export default LogComponent;

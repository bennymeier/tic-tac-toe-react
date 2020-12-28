import LogComponent, { Log } from "./Log";

interface LogContainerProps {
  logs: Log[];
}

const LogContainer: React.FC<LogContainerProps> = (props) => {
  const { logs } = props;
  return (
    <section className="logs-container">
      {!!logs.length && (
        <ul className="logs">
          {logs.map((log, index) => {
            return <LogComponent {...log} key={index} />;
          })}
        </ul>
      )}
    </section>
  );
};

export default LogContainer;

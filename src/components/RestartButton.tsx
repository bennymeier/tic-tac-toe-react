interface RestartButtonProps {
  onClick: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = (props) => {
  const { onClick } = props;
  return (
    <button className="restart button" onClick={onClick}>
      Restart
    </button>
  );
};

export default RestartButton;

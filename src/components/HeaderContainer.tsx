import { Player } from "../App";

interface HeaderProps {
  gameBegan: boolean;
  gameFinished: boolean;
  player: Player;
  winner: string;
}
const HeaderContainer: React.FC<HeaderProps> = (props) => {
  const { gameBegan, gameFinished, player, winner } = props;
  return (
    <section className="game-started">
      {!gameBegan && (
        <p>
          Player <span className={`player ${player}`}>{player}</span> starts the
          game.
        </p>
      )}
      {gameFinished && (
        <p>
          Player <span className={`player ${winner}`}>{winner}</span> won the
          game!
        </p>
      )}
    </section>
  );
};

export default HeaderContainer;

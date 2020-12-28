import React from 'react';

const generateFields = Array.from({ length: 9 }, (_, i) => {
  const nr = `${i + 1}`;
  return {
    id: nr,
    selected: 'false',
    value: '',
  };
});
// all possible winning combinations (of cells filled by the same player)
const winMap = ['123', '456', '789', '147', '258', '369', '159', '357'];
const findWinningMove = (moves: string[]) =>
  winMap.find((comb) =>
    moves.some((m) =>
      comb
        .toString()
        .split('')
        .every((c) => m.includes(c))
    )
  );

type Player = 'x' | 'o';
interface Field {
  id: string;
  selected: string;
  value: string;
}
interface Log {
  datetime: string;
  text: string;
  player: Player;
}
interface State {
  player: Player;
  fields: Field[];
  logs: Log[];
  gameBegan: boolean;
  count: number;
  gameFinished: boolean;
  winner: string;
}
class App extends React.Component {
  state: State = {
    player: 'x',
    fields: generateFields,
    logs: [],
    gameBegan: false,
    gameFinished: false,
    winner: '',
    count: 1,
  };

  changePlayer = (): Promise<Player> => {
    return new Promise((resolve) => {
      if (this.state.player === 'o') {
        this.setState({ player: 'x' }, () => resolve('x'));
      } else {
        this.setState({ player: 'o' }, () => resolve('o'));
      }
    });
  };

  checkForWin = () => {
    const { fields } = this.state;
    const player_one_fields = fields.filter((field) => field.value === 'x');
    const player_one_selected = player_one_fields
      .map((field) => field.id)
      .join('');
    const player_two_fields = fields.filter((field) => field.value === 'o');
    const player_two_selected = player_two_fields
      .map((field) => field.id)
      .join('');
    const winner_1 = findWinningMove([player_one_selected]);
    const winner_2 = findWinningMove([player_two_selected]);
    if (winner_1 || winner_2) {
      this.setState({ gameFinished: true, winner: this.state.player }, () => {
        this.setLogEntry(`Player ${this.state.player} has won the game!`);
      });
    }
  };

  setLogEntry = (text: string) => {
    const { logs, player } = this.state;
    const newLog: Log = {
      text,
      player,
      datetime: new Date().toLocaleTimeString(),
    };
    this.setState({ logs: [newLog, ...logs] });
  };

  fillField = (currentField: Field) => {
    const { player, count, gameFinished } = this.state;
    if (gameFinished) {
      return;
    }
    if (currentField.selected === 'true') {
      console.warn(`Field Nr. ${currentField.id} already selected!`);
      this.setLogEntry(
        `Player ${player} the field ${currentField.id} is already selected.`
      );
      return;
    }
    const fields = this.state.fields.map((field) => {
      if (field.id === currentField.id) {
        return { ...field, selected: 'true', value: this.state.player };
      }
      return field;
    });
    this.setState({ fields, gameBegan: true, count: count + 1 }, async () => {
      if (count > 4) {
        this.checkForWin();
      }

      this.setLogEntry(
        `Player ${player} you have selected field nr. ${currentField.id}.`
      );
      const newPlayer = await this.changePlayer();
      this.setLogEntry(`Player ${newPlayer} it's your turn.`);
    });
  };

  render() {
    const {
      fields,
      player,
      logs,
      gameBegan,
      gameFinished,
      winner,
    } = this.state;
    return (
      <div className="container">
        <section className="game-started">
          {!gameBegan && (
            <p>
              Player <span className={`player ${player}`}>{player}</span> starts
              the game.
            </p>
          )}
          {gameFinished && (
            <p>
              Player <span className={`player ${winner}`}>{winner}</span> won
              the game!
            </p>
          )}
        </section>
        <section className={`board ${gameFinished ? 'disabled' : ''}`}>
          {fields.map((field) => {
            return (
              <div
                className="field"
                data-field={field.id}
                data-selected={field.selected}
                data-value={field.value}
                key={field.id}
                onClick={() => this.fillField(field)}
              >
                {field.value}
              </div>
            );
          })}
        </section>
        <section className="logs-container">
          {!!logs.length && (
            <ul className="logs">
              {logs.map((log, index) => {
                return (
                  <li className={`log player-${log.player}`} key={index}>
                    <span className="datetime">{log.datetime}</span>
                    <p className="text">{log.text}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    );
  }
}

export default App;

import React from 'react';

/**
 * Todos:
 * - Start/Reset Button
 * - Start Button decides if x or o starts
 * - Hover over Field should show current player
 * - Add log just for fun
 */

const generateFields = Array.from({ length: 9 }, (_, i) => {
  const nr = `${i + 1}`;
  return {
    id: nr,
    selected: 'false',
    value: '',
  };
});

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
}
class App extends React.Component {
  state: State = {
    player: 'x',
    fields: generateFields,
    logs: [],
    gameBegan: false,
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
    const { player } = this.state;
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
    this.setState({ fields, gameBegan: true }, async () => {
      this.setLogEntry(
        `Player ${player} you have selected field nr. ${currentField.id}.`
      );
      const newPlayer = await this.changePlayer();
      this.setLogEntry(`Player ${newPlayer} it's your turn.`);
    });
  };

  render() {
    const { fields, player, logs, gameBegan } = this.state;
    return (
      <div className="container">
        <div className="game-started">
          {!gameBegan && (
            <p>
              Player <span className={`player ${player}`}>{player}</span> starts
              the game.
            </p>
          )}
        </div>
        <div className="board">
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
        </div>
        <div className="logs-container">
          <ul className="logs">
            {logs.map((log) => {
              return (
                <li className={`log player-${log.player}`}>
                  <span className="datetime">{log.datetime}</span>
                  <p className="text">{log.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

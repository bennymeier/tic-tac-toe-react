import React from 'react';

/**
 * Todos:
 * - Start/Reset Button
 * - Start Button decides if x or o starts
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

interface State {
  player: Player;
  fields: Field[];
}
class App extends React.Component {
  state: State = {
    player: 'x',
    fields: generateFields,
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

  fillField = (currentField: Field) => {
    if (currentField.selected === 'true') {
      console.warn(`Field Nr. ${currentField.id} already selected!`);
      return;
    }
    const fields = this.state.fields.map((field) => {
      if (field.id === currentField.id) {
        return { ...field, selected: 'true', value: this.state.player };
      }
      return field;
    });
    this.setState({ fields }, async () => {
      console.log(
        `Player ${this.state.player} has selected field nr. ${currentField.id}`
      );
      console.log('Change player!');
      await this.changePlayer();
      console.log(`Player ${this.state.player} is the next!`);
    });
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
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
      </div>
    );
  }
}

export default App;

import readline from 'readline';

export function confirmScript(action: string) {
  const readlineStream = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readlineStream.question(
      `Are you Sure? ('yes' or 'y'):\n${getActionMessage(action)}\n`,
      (confirm: any) => {
        readlineStream.close();

        if (typeof confirm === 'string') {
          confirm = confirm.toLowerCase().trim();
          const didConfirm = confirm.indexOf('yes') > -1 || confirm === 'y';

          return didConfirm ? resolve() : process.exit(1);
        }

        return process.exit(1);
      },
    );
  });
}

function getActionMessage(action: string) {
  switch (action) {
    case 'drop':
      return 'This will drop the database';
    default:
      return 'This will create the database';
  }
}
